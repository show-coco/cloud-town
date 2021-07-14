import { Community as PCommunity } from '@prisma/client'
import prisma from '../../../../prisma'
import Community from '../../../domain/entities/Community'
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

  async createCommunity(community: Community): Promise<Community> {
    console.log('PCommunityRepository createCommunity args', {
      community,
    })

    const pCommunity = await prisma.community.create({
      data: {
        id: community.getCommunityId(),
        name: community.getName(),
        slug: community.getSlug(),
        introduction: community.getIntroduction(),
      },
    })

    console.log('pCommunity', pCommunity)

    return this.converter(pCommunity)
  }

  private converter(pCommunity: PCommunity): Community {
    return new Community({
      id: pCommunity.id,
      name: pCommunity.name,
      slug: pCommunity.slug,
      introduction: pCommunity.introduction,
      createdAt: pCommunity.created_at,
      updatedAt: pCommunity.updated_at,
    })
  }
}
