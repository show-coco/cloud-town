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
    plans,
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

    const newPlans =
      plans &&
      plans.map((plan) => {
        return new Plan({
          name: plan.name,
          introduction: plan.introduction,
          pricePerMonth: plan.pricePerMonth,
          trialPeriod: plan.trialPeriod,
          numberOfApplicants: plan.numberOfApplicants,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      })
    newPlans.forEach((newPlan) => {
      community.addPlan(newPlan)
    })

    return this.communityRepo.createCommunity(community)
  }
}
