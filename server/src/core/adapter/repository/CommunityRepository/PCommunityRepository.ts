import { prisma } from '../../../../prisma'
import Community from '../../../domain/entities/Community'
import ICommunityRepository from './ICommunityRepository'

export default class PCommunityRepository implements ICommunityRepository {
  async getCommunityById(id: number): Promise<Community | null> {
    const pCommunity = await prisma.community.findFirst({ where: { id } })

    if (!pCommunity) return null

    const communty = new Community(pCommunity.id)
    return communty
  }
}
