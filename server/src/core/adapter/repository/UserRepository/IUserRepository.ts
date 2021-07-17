import User from '../../../domain/entities/User'

export default interface IUserRepository {
  getUserById(id: string): Promise<User>
  getUserByGoogleId(googleId: string): Promise<User>
  createUser(name: string, externalId: string, email: string): Promise<User>
}
