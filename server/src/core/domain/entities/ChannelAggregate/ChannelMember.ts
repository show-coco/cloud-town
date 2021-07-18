import { ChannelRole } from '@prisma/client'
import User from '../User'

export default class ChannelMember extends User {
  private _memberId?: number
  private _role: ChannelRole

  constructor(args: {
    id?: string
    slug: string
    email: string
    name: string
    googleId: string
    role: ChannelRole
    memberId?: number
  }) {
    super(args)
    this._memberId = args.memberId
    this._role = args.role
  }

  get role(): ChannelRole {
    return this._role
  }

  get memberId(): number | undefined {
    return this._memberId
  }

  changeRole(role: ChannelRole): void {
    this._role = role
  }
}
