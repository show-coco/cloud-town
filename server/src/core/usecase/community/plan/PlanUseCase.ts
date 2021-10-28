import { TrialPeriod } from '@prisma/client'
import IPlanRepository from '../../../adapter/repository/PlanRepository/IPlanRepository'
import Plan from '../../../domain/entities/CommunityAggregate/Plan'
import { CreatePlanParam } from './PlanUseCaseParam'

export default class PlanUseCase {
  private planRepo: IPlanRepository

  constructor(planRepo: IPlanRepository) {
    this.planRepo = planRepo
  }

  getPlansByCommunityId(communityId: string): Promise<Plan[]> {
    return this.planRepo.getPlansByCommunityId(communityId)
  }

  async createPlan({
    name,
    introduction,
    pricePerMonth,
    trialPeriod: reqTrialPeriod,
    numberOfApplicants,
  }: CreatePlanParam): Promise<Plan> {
    const trialPeriod =
      reqTrialPeriod === TrialPeriod.FREE_FOR_THE_FIRST_MONTH
        ? reqTrialPeriod
        : null

    const plan = new Plan({
      name,
      introduction,
      pricePerMonth,
      trialPeriod,
      numberOfApplicants,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return this.planRepo.save(plan)
  }
}
