import Community from '../../../domain/entities/Community'
import { CreateCommunityParam } from './TCommunityRepository'

export default interface ICommunityRepository {
  /**
   * @param id
   */
  getCommunityById(id: number): Promise<Community | null>

  /**
   * Communityの作成
   */
  createCommunity(arg: CreateCommunityParam): Promise<Community>
}
