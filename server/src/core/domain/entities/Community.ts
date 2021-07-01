import { v4 } from 'uuid'

export default class Community {
  private id: string
  private name: string
  private slug: string
  private introduction: string
  private createdAt: Date
  private updatedAt: Date

  constructor({
    id,
    name,
    slug,
    introduction,
    createdAt,
    updatedAt,
  }: {
    id?: string
    name: string
    slug: string
    introduction: string
    createdAt: Date
    updatedAt: Date
  }) {
    this.id = id || v4()
    this.name = name
    this.slug = slug
    this.introduction = introduction
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  getCommunityId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getSlug(): string {
    return this.slug
  }

  getIntroduction(): string {
    return this.introduction
  }

  getCreatedAt(): Date {
    return this.createdAt
  }

  getUpdatedAt(): Date {
    return this.updatedAt
  }
}
