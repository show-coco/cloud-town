import { v4 } from 'uuid'

export default class User {
  private id: string
  private slug: string
  private email: string
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

  getSlug(): string {
    return this.slug
  }

  getEmail(): string {
    return this.email
  }

  getName(): string {
    return this.name
  }

  getGoogleId(): string {
    return this.googleId
  }
}
