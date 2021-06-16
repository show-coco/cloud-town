import ICommunityRepository from '../adapter/repository/CommunityRepository/ICommunityRepository'
import Community from '../domain/entities/Community'

export default class CommunityUseCase {
  private communityRepo: ICommunityRepository

  constructor(communityRepo: ICommunityRepository) {
    this.communityRepo = communityRepo
  }

  getCommunityById(id: number): Promise<Community | null> {
    return this.communityRepo.getCommunityById(id)
  }
}
