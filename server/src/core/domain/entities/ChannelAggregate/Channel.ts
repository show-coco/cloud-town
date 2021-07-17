import { ChannelRole } from '@prisma/client'
import { v4 } from 'uuid'
import ChannelMember from './ChannelMember'

export default class Channel {
  readonly id: string
  private _name: string
  private _slug: string
  private _isPrivate: boolean
  private _channelMembers: ChannelMember[] = []
  private _communityId: string
  private _deletedAt?: Date

  constructor({
    id,
    name,
    slug,
    isPrivate,
    channelMember,
    communityId,
  }: {
    id?: string
    name: string
    slug: string
    isPrivate: boolean
    channelMember?: ChannelMember[]
    communityId: string
  }) {
    this.id = id || v4()
    this._name = name
    this._slug = slug
    this._isPrivate = isPrivate
    this._channelMembers = channelMember || []
    this._communityId = communityId
  }

  existsInChannel(userId: string): boolean {
    return this._channelMembers.some(
      (channelMember) => channelMember.userId === userId
    )
  }

  addOwner(userId: string): void {
    // チャンネルのオーナーは1人
    if (this.currentOwner) {
      throw new Error('Owner already exists.')
    }

    const owner = new ChannelMember({
      userId,
      channelId: this.id,
      role: ChannelRole.OWNER,
    })

    this._channelMembers.push(owner)
  }

  changeOwner(currentOwnerId: string, nextOwnerId: string): void {
    const currentOwner = this.currentOwner

    // オーナー権限を委譲できるのは現在オーナーのメンバーのみ
    if (currentOwner?.userId !== currentOwnerId)
      throw new Error("This user doesn't have authorization to change owner.")

    const owner = this.currentOwner
    const member = this.getMember(nextOwnerId)
    if (!owner) throw new Error("Owner doesn't exists.")
    if (!member) throw new Error("Member doesn't exists.")

    owner.changeRole(ChannelRole.ADMIN)
    member.changeRole(ChannelRole.OWNER)
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

  deleteChannel(userId: string): void {
    // 削除できるのはオーナーかアドミンのみ
    if (!this.isOwner(userId) && !this.isAdmin(userId))
      throw new Error('User does not have authorization to delete the channel')

    this._deletedAt = new Date()
  }

  getMember(userId: string): ChannelMember | undefined {
    return this._channelMembers.find(
      (channelMember) => channelMember.userId === userId
    )
  }

  private isOwner(userId: string): boolean {
    return this.getMember(userId)?.role === ChannelRole.OWNER
  }

  private isAdmin(userId: string): boolean {
    return this.getMember(userId)?.role === ChannelRole.OWNER
  }

  get currentOwner(): ChannelMember | undefined {
    return this._channelMembers.find(
      (channelMember) => channelMember.role === ChannelRole.OWNER
    )
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

  get communityId(): string {
    return this._communityId
  }

  get deletedAt(): Date | undefined {
    return this._deletedAt
  }
}
