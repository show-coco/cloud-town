import User from '../../../domain/entities/User'

export default interface IUserRepository {
  getUserById(id: number): Promise<User | null>
  getUserByGoogleId(googleId: string): Promise<User | null>
  createUser(name: string, externalId: string, email: string): Promise<User>
}
