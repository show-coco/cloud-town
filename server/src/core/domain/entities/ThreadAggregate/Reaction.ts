export default class Reaction {
  private _id?: number | undefined
  private _emoji: string
  private _senderId: string

  constructor({
    id,
    emoji,
    senderId,
  }: {
    id?: number
    emoji: string
    senderId: string
  }) {
    this._id = id
    this._emoji = emoji
    this._senderId = senderId
  }

  public get id(): number | undefined {
    return this._id
  }

  public get emoji(): string {
    return this._emoji
  }

  public get senderId(): string {
    return this._senderId
  }
}
