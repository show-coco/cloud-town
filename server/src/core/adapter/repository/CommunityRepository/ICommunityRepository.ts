import Community from '../../../domain/entities/CommunityAggregate/Community'

export default interface ICommunityRepository {
  /**
   * @param id
   */
  getCommunityById(id: string): Promise<Community | null>

  /**
   * Communityの作成
   */
  createCommunity(arg: Community): Promise<Community>
}
