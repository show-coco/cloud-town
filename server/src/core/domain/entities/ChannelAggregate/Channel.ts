import { v4 } from 'uuid'
import ChannelMember from './ChannelMember'

export default class Channel {
  readonly id: string
  readonly name: string
  readonly slug: string
  readonly isPrivate: boolean
  readonly channelMembers: ChannelMember[] = []

  constructor({
    id,
    name,
    slug,
    isPrivate,
    channelMember,
  }: {
    id?: string
    name: string
    slug: string
    isPrivate: boolean
    channelMember?: ChannelMember[]
  }) {
    this.id = id || v4()
    this.name = name
    this.slug = slug
    this.isPrivate = isPrivate
    this.channelMembers = channelMember || []
  }

  addOwner(userId: string): void {
    if (this.currentOwner()) {
      throw new Error('Owner already exists.')
    }

    const owner = new ChannelMember({
      userId,
      channelId: this.id,
      role: 'OWNER',
    })

    this.channelMembers?.push(owner)
  }

  changeOwner(userId: string): void {
    this.removeCurrentOwner()
    this.addOwner(userId)
  }

  private removeCurrentOwner(): void {
    this.channelMembers.filter(
      (channelMember) => channelMember.role !== 'OWNER'
    )
  }

  currentOwner(): ChannelMember | undefined {
    return this.channelMembers.find(
      (channelMember) => channelMember.role === 'OWNER'
    )
  }
}
