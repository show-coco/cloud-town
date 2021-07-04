import { ChannelRole } from '@prisma/client'

export default class ChannelMember {
  readonly id?: number
  readonly userId: string
  readonly channelId: string
  readonly role: ChannelRole

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
    this.role = role
  }
}
