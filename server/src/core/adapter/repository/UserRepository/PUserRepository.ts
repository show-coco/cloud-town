import { User as PUser } from '@prisma/client'
import User from '../../../domain/entities/User'
import prisma from '../../../../prisma'
import IUserRepository from './IUserRepository'

export default class PUserRepository implements IUserRepository {
  async getUserById(id: string): Promise<User> {
    const pUser = await prisma.user.findFirst({ where: { id: id } })

    if (!pUser) throw new Error('User not found')

    return this.converter(pUser)
  }

  async getUsersByIds(ids: string[]): Promise<User[]> {
    const pUsers = await prisma.user.findMany({ where: { id: { in: ids } } })

    const users = pUsers.map((pUser) => this.converter(pUser))
    return users
  }

  async getUserByGoogleId(googleId: string): Promise<User> {
    const pUser = await prisma.user.findFirst({
      where: { google_id: googleId },
    })

    if (!pUser) throw new Error('User not found')

    return this.converter(pUser)
  }

  async createUser(user: User): Promise<User> {
    const pUser = await prisma.user.create({
      data: {
        name: user.name,
        slug: user.slug,
        email: user.email,
        google_id: user.googleId,
      },
    })

    console.log('pUser', pUser)

    return this.converter(pUser)
  }

  private converter(pUser: PUser): User {
    return new User({
      id: pUser.id,
      email: pUser.email,
      slug: pUser.slug,
      name: pUser.name,
      googleId: pUser.google_id,
    })
  }
}
