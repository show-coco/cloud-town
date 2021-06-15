import Community from '../../../domain/entities/Community'

export default interface ICommunityRepository {
  getCommunityById(id: number): Promise<Community | null>
}
