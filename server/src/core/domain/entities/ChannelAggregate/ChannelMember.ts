import { ChannelRole } from '@prisma/client'

export default class ChannelMember {
  readonly id?: number
  readonly userId: string
  readonly channelId: string
  private _role: ChannelRole

  constructor({
    id,
    userId,
    channelId,
    role,
  }: {
    id?: number
    userId: string
    channelId: string
    role: ChannelRole
  }) {
    this.id = id
    this.userId = userId
    this.channelId = channelId
    this._role = role
  }

  get role(): ChannelRole {
    return this._role
  }

  changeRole(role: ChannelRole): void {
    this._role = role
  }
}
