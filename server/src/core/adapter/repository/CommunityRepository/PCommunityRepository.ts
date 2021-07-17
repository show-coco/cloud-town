import {
  Community as PCommunity,
  CommunityPlan as PCommunityPlan,
  Plan as PPlan,
} from '@prisma/client'
import prisma from '../../../../prisma'
import Community from '../../../domain/entities/CommunityAggregate/Community'
import CommunityPlan from '../../../domain/entities/CommunityAggregate/CommunityPlan'
import Plan from '../../../domain/entities/CommunityAggregate/Plan'
import ICommunityRepository from './ICommunityRepository'

export default class PCommunityRepository implements ICommunityRepository {
  async getCommunityById(id: string): Promise<Community | null> {
    console.log('PCommunityRepository getCommunityById args', {
      id,
    })

    const pCommunity = await prisma.community.findFirst({ where: { id } })

    console.log('pCommunity', pCommunity)

    if (!pCommunity) return null

    const community = new Community({
      id: pCommunity.id,
      name: pCommunity.name,
      slug: pCommunity.slug,
      introduction: pCommunity.introduction,
      createdAt: pCommunity.created_at,
      updatedAt: pCommunity.updated_at,
    })
    return community
  }

  /**
   * コミュニティの作成
   *
   * @param community
   * @returns
   */
  async createCommunity(community: Community): Promise<Community> {
    console.log('PCommunityRepository createCommunity args', {
      community,
    })

    await prisma.plan.createMany({
      data: community.getCommunityPlans().map(
        (communityPlan): PPlan => ({
          id: communityPlan.getPlan().getId(),
          name: communityPlan.getPlan().getName(),
          introduction: communityPlan.getPlan().getIntroduction(),
          price_per_month: communityPlan.getPlan().getPricePerMonth(),
          trail_period: communityPlan.getPlan().getTrailPeriod(),
          number_of_applicants: communityPlan.getPlan().getNumberOfApplicants(),
          deleted_at: null,
          created_at: communityPlan.getPlan().getCreatedAt(),
          updated_at: communityPlan.getPlan().getUpdatedAt(),
        })
      ),
    })

    const pCommunity = await prisma.community.create({
      data: {
        id: community.getCommunityId(),
        name: community.getName(),
        slug: community.getSlug(),
        introduction: community.getIntroduction(),
      },
    })

    await prisma.communityPlan.createMany({
      data: community.getCommunityPlans().map((communityPlan) => ({
        community_id: communityPlan.getCommunityId(),
        plan_id: communityPlan.getPlanId(),
        created_at: communityPlan.getCreatedAt(),
        updated_at: communityPlan.getUpdatedAt(),
      })),
    })

    const pCommunityPlans = await prisma.communityPlan.findMany({
      where: {
        community_id: pCommunity.id,
      },
    })

    const pPlans = await prisma.plan.findMany({
      where: {
        id: {
          in: pCommunityPlans.map((pCommunityPlan) => pCommunityPlan.plan_id),
        },
      },
    })

    console.log('pCommunity', pCommunity)

    return this.converter({
      pCommunity,
      pCommunityPlans,
      pPlans,
    })
  }

  private converter({
    pCommunity,
    pCommunityPlans,
    pPlans,
  }: {
    pCommunity: PCommunity
    pCommunityPlans: PCommunityPlan[]
    pPlans: PPlan[]
  }): Community {
    return new Community({
      id: pCommunity.id,
      name: pCommunity.name,
      slug: pCommunity.slug,
      introduction: pCommunity.introduction,
      createdAt: pCommunity.created_at,
      updatedAt: pCommunity.updated_at,
      communityPlans: pCommunityPlans.map((pCommunityPlan) =>
        this.convertCommunityPlan(pCommunityPlan, pPlans)
      ),
    })
  }

  private convertCommunityPlan(
    pCommunityPlan: PCommunityPlan,
    pPlans: PPlan[]
  ): CommunityPlan {
    return new CommunityPlan({
      communityId: pCommunityPlan.community_id,
      planId: pCommunityPlan.plan_id,
      createdAt: pCommunityPlan.created_at,
      updatedAt: pCommunityPlan.updated_at,
      plan: (() => {
        const pPlan = pPlans.find(
          (_pPlan) => _pPlan.id === pCommunityPlan.plan_id
        )
        if (!pPlan) {
          throw new Error(
            'プランが存在しません。DBで不整合が起きている可能性があります。'
          )
        }

        return this.convertPlan(pPlan)
      })(),
    })
  }

  private convertPlan(pPlan: PPlan): Plan {
    return new Plan({
      name: pPlan.name,
      introduction: pPlan.introduction,
      pricePerMonth: pPlan.price_per_month,
      trailPeriod: pPlan.trail_period,
      numberOfApplicants: pPlan.number_of_applicants,
      createdAt: pPlan.created_at,
      updatedAt: pPlan.updated_at,
    })
  }
}
