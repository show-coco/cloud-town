export default class UserRepository {
  getUserById(id: number): number {
    return 2;
  }

  getUserByExternalId(service: 'google', id: string): number {
    return 2
  }

  createUser(name: string, service: 'google', id: string): number {
    return 2;
  } 
}