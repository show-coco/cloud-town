import { v4 } from 'uuid'

export default class User {
  private id: string
  /** スラッグ */
  private slug: string
  /** メールアドレス */
  private email: string
  /** 表示名 */
  private name: string
  private googleId: string

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
    this.id = id || v4()
    this.slug = slug
    this.email = email
    this.name = name
    this.googleId = googleId
  }

  getId(): string {
    return this.id
  }

  /** スラッグ */
  getSlug(): string {
    return this.slug
  }

  /** メールアドレス */
  getEmail(): string {
    return this.email
  }

  /** 表示名 */
  getName(): string {
    return this.name
  }

  getGoogleId(): string {
    return this.googleId
  }
}
