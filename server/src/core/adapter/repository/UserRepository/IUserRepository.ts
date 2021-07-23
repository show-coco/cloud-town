import User from '../../../domain/entities/User'

export default interface IUserRepository {
  getUserById(id: string): Promise<User>
  getUsersByIds(ids: string[]): Promise<User[]>
  getUserByGoogleId(googleId: string): Promise<User>
  createUser(user: User): Promise<User>
}
