import { v4 } from 'uuid'

export default class Read {
  private _id: string
  private _messageId: string
  private _userId: string
  private _createdAt: Date
  private _updatedAt: Date

  constructor({
    id,
    messageId,
    userId,
    createdAt,
    updatedAt,
  }: {
    id?: string
    messageId: string
    userId: string
    createdAt: Date
    updatedAt: Date
  }) {
    this._id = id || v4()
    this._messageId = messageId
    this._userId = userId
    this._createdAt = createdAt
    this._updatedAt = updatedAt
  }

  public get id(): string {
    return this._id
  }

  public get messageId(): string {
    return this._messageId
  }

  public get userId(): string {
    return this._userId
  }

  public get createdAt(): Date {
    return this._createdAt
  }

  public get updatedAt(): Date {
    return this._updatedAt
  }
}
