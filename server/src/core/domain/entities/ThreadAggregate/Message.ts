import { v4 } from 'uuid'
import ChannelMember from '../ChannelAggregate/ChannelMember'

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
}

export type MessageRegenerateProps = {
  content: string
  channelId: string
  senderId: string
  slug: string
  id: string
  pinned: boolean
}

export default class Message {
  protected _id: string
  protected _content: string
  protected _slug: string
  protected _pinned: boolean
  protected _channelId: string
  protected _senderId: string
  protected _readers?: ChannelMember[]

  protected constructor({
    id,
    content,
    slug,
    pinned,
    channelId,
    senderId,
    readers,
  }: MessageConstructorProps) {
    this._id = id
    this._content = content
    this._slug = slug
    this._pinned = pinned
    this._channelId = channelId
    this._senderId = senderId
    this._readers = readers
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
