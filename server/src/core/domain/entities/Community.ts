export default class Community {
  private id: number
  private name: string

  constructor({ id, name }: { id: number; name: string }) {
    this.id = id
    this.name = name
  }

  getCommunityId(): number {
    return this.id
  }

  getName(): string {
    return this.name
  }
}
