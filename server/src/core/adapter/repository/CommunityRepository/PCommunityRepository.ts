import { Community as PCommunity } from '@prisma/client'
import { prisma } from '../../../../prisma'
import Community from '../../../domain/entities/Community'
import ICommunityRepository from './ICommunityRepository'
import { CreateCommunityParam } from './TCommunityRepository'

export default class PCommunityRepository implements ICommunityRepository {
  async getCommunityById(id: number): Promise<Community | null> {
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
      createdAt: pCommunity.createdAt,
      updatedAt: pCommunity.updatedAt,
    })
    return community
  }

  async createCommunity({
    name,
    slug,
    introduction,
  }: CreateCommunityParam): Promise<Community> {
    console.log('PCommunityRepository createCommunity args', {
      name,
      slug,
      introduction,
    })

    const pCommunity = await prisma.community.create({
      data: {
        name,
        slug,
        introduction,
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
      createdAt: pCommunity.createdAt,
      updatedAt: pCommunity.updatedAt,
    })
  }
}
