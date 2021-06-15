export default class Community {
  private id: number

  constructor(id: number) {
    this.id = id
  }

  getCommunityId(): number {
    return this.id
  }
}
