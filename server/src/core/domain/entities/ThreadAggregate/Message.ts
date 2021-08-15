import { v4 } from 'uuid'
import ChannelMember from '../ChannelAggregate/ChannelMember'
import Reaction from './Reaction'
import Read from './Read'

export type MessageCreateProps = {
  content: string
  channelId: string
  senderId: string
}

export type MessageConstructorProps = {
  id: string
  content: string
  channelId: string
  slug: string
  pinned: boolean
  senderId: string
  readers?: ChannelMember[]
  reactions?: Reaction[]
  reads?: Read[]
}

export type MessageRegenerateProps = {
  content: string
  channelId: string
  senderId: string
  slug: string
  id: string
  pinned: boolean
  reactions?: Reaction[]
  reads?: Read[]
}

export default class Message {
  protected _id: string
  protected _content: string
  protected _slug: string
  protected _pinned: boolean
  protected _channelId: string
  protected _senderId: string
  protected _readers: ChannelMember[] = []
  protected _reactions: Reaction[] | undefined
  protected _reads: Read[] | undefined

  protected constructor({
    id,
    content,
    slug,
    pinned,
    channelId,
    senderId,
    reactions,
    readers,
    reads,
  }: MessageConstructorProps) {
    this._id = id
    this._content = content
    this._slug = slug
    this._pinned = pinned
    this._channelId = channelId
    this._senderId = senderId
    this._reactions = reactions
    this._readers = readers || []
    this._reads = reads || []
  }

  static create(props: MessageCreateProps): Message {
    const timestamp = new Date().getTime()
    const slug = 'M' + timestamp.toString()
    const id = v4()
    const pinned = false

    return new Message({
      ...props,
      id,
      slug,
      pinned,
    })
  }

  static regenerate(props: MessageRegenerateProps): Message {
    return new Message(props)
  }

  changePinned(pinned: boolean): void {
    this._pinned = pinned
  }

  changeContent(content: string): void {
    this._content = content
  }

  addReaction(emoji: string, senderId: string): void {
    const exists = this.reactions?.some(
      (reaction) => reaction.emoji === emoji && reaction.senderId === senderId
    )
    if (exists) throw new Error('This user already added this emoji')

    const reaction = new Reaction({ emoji, senderId })
    this._reactions?.push(reaction)
  }

  addRead(userId: string, readAt: Date = new Date()): void {
    const exists = this._reads?.some((read) => read.userId === userId)
    if (exists) throw new Error('This user already read this message')
    const read = new Read({
      userId,
      messageId: this._id,
      createdAt: readAt,
      updatedAt: readAt,
    })
    this._reads?.push(read)
  }

  get reactions(): Reaction[] | undefined {
    return this._reactions
  }

  get id(): string {
    return this._id
  }

  get content(): string {
    return this._content
  }

  get slug(): string {
    return this._slug
  }

  get readers(): ChannelMember[] | undefined {
    return this._readers
  }

  get senderId(): string {
    return this._senderId
  }

  get pinned(): boolean {
    return this._pinned
  }

  get channelId(): string {
    return this._channelId
  }
}
