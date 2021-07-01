import { v4 } from 'uuid'

export default class Channel {
  private id: string
  private name: string
  private slug: string
  private isPrivate: boolean

  constructor({
    id,
    name,
    slug,
    isPrivate,
  }: {
    id?: string
    name: string
    slug: string
    isPrivate: boolean
  }) {
    this.id = id || v4()
    this.name = name
    this.slug = slug
    this.isPrivate = isPrivate
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getSlug(): string {
    return this.slug
  }

  getIsPrivate(): boolean {
    return this.isPrivate
  }
}
