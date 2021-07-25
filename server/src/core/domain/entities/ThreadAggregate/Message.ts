import { v4 } from 'uuid'
import ChannelMember from '../ChannelAggregate/ChannelMember'

export type MessageProps = {
  content: string
  sender: ChannelMember
  channelId: string
}

export default class Message {
  private _id: string
  private _content: string
  private _slug: string
  private _pinned: boolean
  private _channelId: string
  readonly _sender: ChannelMember
  readonly _readers?: ChannelMember[]

  constructor({ content, sender, channelId }: MessageProps) {
    this._content = content
    this._channelId = channelId
    this._sender = sender
    this._slug = 'Cxxxxx' // TODO: スラッグを生成
    this._id = v4()
    this._pinned = false
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

  get sender(): ChannelMember {
    return this._sender
  }

  get pinned(): boolean {
    return this._pinned
  }

  get channelId(): string {
    return this._channelId
  }
}
