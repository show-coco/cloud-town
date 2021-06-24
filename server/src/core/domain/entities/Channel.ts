export default class Channel {
  private id: number
  private name: string
  private slug: string
  private isPrivate: boolean

  constructor({
    id,
    name,
    slug,
    isPrivate,
  }: {
    id?: number // 作成と再構成に対応するためにオプショナルにしている(参考: https://khalilstemmler.com/articles/typescript-domain-driven-design/entities/#Optional-id-field)
    name: string
    slug: string
    isPrivate: boolean
  }) {
    this.id = id || 1 // TODO: UUIDに変更する
    this.name = name
    this.slug = slug
    this.isPrivate = isPrivate
  }

  getId(): number {
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
