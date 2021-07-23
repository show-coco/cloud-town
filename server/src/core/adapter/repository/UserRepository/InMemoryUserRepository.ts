import User from '../../../domain/entities/User'
import IUserRepository from './IUserRepository'

export default class InMemoryUserRepository implements IUserRepository {
  private users: User[] = []

  getUserById(id: string): Promise<User> {
    return new Promise((resolve) => {
      const user = this.users.find((user) => user.id === id)
      if (!user) throw new Error('User not found')
      resolve(user)
    })
  }

  getUsersByIds(ids: string[]): Promise<User[]> {
    return new Promise((resolve) => {
      const users = this.users.filter((user) => {
        ids.includes(user.id)
      })
      resolve(users)
    })
  }

  getUserByGoogleId(googleId: string): Promise<User> {
    throw new Error('Method not implemented.')
  }

  createUser(user: User): Promise<User> {
    this.users.push(user)

    return new Promise((resolve) => {
      resolve(user)
    })
  }
}
