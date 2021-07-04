import { v4 } from 'uuid'

export default class Community {
  private id: string
  /** コミュニティ名 */
  private name: string
  /** スラッグ */
  private slug: string
  /** コミュニティ紹介文 */
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

  /** コミュニティ名 */
  getName(): string {
    return this.name
  }

  /** スラッグ */
  getSlug(): string {
    return this.slug
  }

  /** コミュニティ紹介文 */
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
