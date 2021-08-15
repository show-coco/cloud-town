import { Plan as PPlan } from '@prisma/client'
import prisma from '../../../../prisma'
import Plan from '../../../domain/entities/CommunityAggregate/Plan'
import IPlanRepository from './IPlanRepository'

export default class PPlanRepository implements IPlanRepository {
  async getPlansByCommunityId(communityId: string): Promise<Plan[]> {
    const communityPlans = await prisma.communityPlan.findMany({
      where: { community_id: communityId },
    })
    const plans = await prisma.plan.findMany({
      where: {
        id: {
          in: communityPlans.map((p) => p.plan_id),
        },
      },
    })

    return plans.map((plan) => this.converter(plan))
  }

  async save(plan: Plan): Promise<Plan> {
    const exists = await prisma.plan.findFirst({ where: { id: plan.getId() } })
    if (!exists) {
      return this.createPlan(plan)
    }

    return this.updatePlan(plan)
  }

  private async createPlan(plan: Plan): Promise<Plan> {
    const newPlan = await prisma.plan.create({
      data: {
        id: plan.getId(),
        name: plan.getName(),
        introduction: plan.getIntroduction(),
        price_per_month: plan.getPricePerMonth(),
        trial_period: plan.getTrialPeriod(),
        number_of_applicants: plan.getNumberOfApplicants(),
        created_at: plan.getCreatedAt(),
        updated_at: plan.getUpdatedAt(),
      },
    })

    return this.converter(newPlan)
  }

  private async updatePlan(plan: Plan): Promise<Plan> {
    const newPlan = await prisma.plan.update({
      data: {
        name: plan.getName(),
        introduction: plan.getIntroduction(),
        price_per_month: plan.getPricePerMonth(),
        trial_period: plan.getTrialPeriod(),
        number_of_applicants: plan.getNumberOfApplicants(),
        created_at: plan.getCreatedAt(),
        updated_at: plan.getUpdatedAt(),
      },
      where: {
        id: plan.getId(),
      },
    })

    return this.converter(newPlan)
  }

  private converter(plan: PPlan): Plan {
    return new Plan({
      id: plan.id,
      name: plan.name,
      introduction: plan.introduction,
      pricePerMonth: plan.price_per_month,
      trialPeriod: plan.trial_period,
      numberOfApplicants: plan.number_of_applicants,
      createdAt: plan.created_at,
      updatedAt: plan.updated_at,
    })
  }
}
