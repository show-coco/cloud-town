import ICommunityRepository from '../../adapter/repository/CommunityRepository/ICommunityRepository'
import { CreateCommunityParam } from './CommunityUseCaseParam'
import Community from '../../domain/entities/Community'

export default class CommunityUseCase {
  private communityRepo: ICommunityRepository

  constructor(communityRepo: ICommunityRepository) {
    this.communityRepo = communityRepo
  }

  getCommunityById(id: string): Promise<Community | null> {
    return this.communityRepo.getCommunityById(id)
  }

  /**
   * コミュニティの作成
   *
   * @param arg CreateCommunityParam
   * @returns
   */
  createCommunity({
    name,
    slug,
    introduction,
  }: CreateCommunityParam): Promise<Community> {
    console.log('CommunityUseCase createCommunity args', {
      name,
      slug,
      introduction,
    })

    const community = new Community({
      name,
      slug,
      introduction,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return this.communityRepo.createCommunity(community)
  }
}
