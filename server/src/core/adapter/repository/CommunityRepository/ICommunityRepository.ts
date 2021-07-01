import Community from '../../../domain/entities/Community'

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
