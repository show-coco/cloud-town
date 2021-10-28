import Plan from '../../../domain/entities/CommunityAggregate/Plan'

export default interface IPlanRepository {
  getPlansByCommunityId(communityId: string): Promise<Plan[]>

  save(plan: Plan): Promise<Plan>
}
