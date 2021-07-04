import { ChannelRole } from '@prisma/client'
import { v4 } from 'uuid'
import ChannelMember from './ChannelMember'

export default class Channel {
  readonly id: string
  private _name: string
  private _slug: string
  private _isPrivate: boolean
  private _channelMembers: ChannelMember[] = []

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
    this._name = name
    this._slug = slug
    this._isPrivate = isPrivate
    this._channelMembers = channelMember || []
  }

  get name(): string {
    return this._name
  }

  get slug(): string {
    return this._slug
  }

  get isPrivate(): boolean {
    return this._isPrivate
  }

  get channelMembers(): ChannelMember[] {
    return this._channelMembers
  }

  existsInChannel(userId: string): boolean {
    return this._channelMembers.some(
      (channelMember) => channelMember.userId === userId
    )
  }

  // チャンネルのオーナーは1人
  addOwner(userId: string): void {
    if (this.currentOwner()) {
      throw new Error('Owner already exists.')
    }

    const owner = new ChannelMember({
      userId,
      channelId: this.id,
      role: ChannelRole.OWNER,
    })

    this._channelMembers?.push(owner)
  }

  changeOwner(userId: string): void {
    this.removeCurrentOwner()
    this.addOwner(userId)
  }

  changeName(name: string): void {
    this._name = name
  }

  changeSlug(slug: string): void {
    this._slug = slug
  }

  changeIsPrivate(isPrivate: boolean): void {
    this._isPrivate = isPrivate
  }

  private removeCurrentOwner(): void {
    this._channelMembers.filter(
      (channelMember) => channelMember.role !== ChannelRole.OWNER
    )
  }

  currentOwner(): ChannelMember | undefined {
    return this._channelMembers.find(
      (channelMember) => channelMember.role === ChannelRole.OWNER
    )
  }
}
