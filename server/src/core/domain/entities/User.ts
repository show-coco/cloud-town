export default class User {
  private id: number
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
    id: number
    slug: string
    email: string
    name: string
    googleId: string
  }) {
    this.id = id
    this.slug = slug
    this.email = email
    this.name = name
    this.googleId = googleId
  }

  getId(): number {
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
