import Community from '../../../domain/entities/Community'

export default interface ICommunityRepository {
  /**
   * @param id
   */
  getCommunityById(id: number): Promise<Community | null>

  /**
   * Communityの作成
   */
  createCommunity(arg: {
    name: string
  }): Promise<Community>
}
