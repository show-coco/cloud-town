import ICommunityRepository from '../../adapter/repository/CommunityRepository/ICommunityRepository'
import { CreateCommunityParam } from './CommunityUseCaseParam'
import Community from '../../domain/entities/CommunityAggregate/Community'
import Plan from '../../domain/entities/CommunityAggregate/Plan'

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
  async createCommunity({
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

    const newPlan = new Plan({
      name: `${name}の無料プラン`,
      introduction: `${name}の無料プランです。`,
      pricePerMonth: 0,
      trailPeriod: null,
      numberOfApplicants: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    community.addPlan(newPlan)

    return this.communityRepo.createCommunity(community)
  }
}
