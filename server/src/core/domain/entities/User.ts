import { v4 } from 'uuid'

export default class User {
  private _id: string
  /** スラッグ */
  private _slug: string
  /** メールアドレス */
  private _email: string
  /** 表示名 */
  private _name: string
  private _googleId: string

  constructor({
    id,
    slug,
    email,
    name,
    googleId,
  }: {
    id?: string
    slug: string
    email: string
    name: string
    googleId: string
  }) {
    this._id = id || v4()
    this._slug = slug
    this._email = email
    this._name = name
    this._googleId = googleId
  }

  get id(): string {
    return this._id
  }

  /** スラッグ */
  get slug(): string {
    return this._slug
  }

  /** メールアドレス */
  get email(): string {
    return this._email
  }

  /** 表示名 */
  get name(): string {
    return this._name
  }

  get googleId(): string {
    return this._googleId
  }
}
