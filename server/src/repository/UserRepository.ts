export default class UserRepository {
  getUserById(id: number): { id: number } {
    return { id: 2 }
  }

  getUserByExternalId(service: 'google', id: string): { id: number } {
    return { id: 2 }
  }

  createUser(name: string, service: 'google', id: string): { id: number } {
    return { id: 2 }
  }
}
