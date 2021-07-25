import { v4 } from 'uuid'
import CommunityPlan from './CommunityPlan'
import Plan from './Plan'

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
  private _communityPlans: CommunityPlan[]

  constructor({
    id,
    name,
    slug,
    introduction,
    createdAt,
    updatedAt,
    communityPlans,
  }: {
    id?: string
    name: string
    slug: string
    introduction: string
    createdAt: Date
    updatedAt: Date
    communityPlans?: CommunityPlan[]
  }) {
    this.id = id || v4()
    this.name = name
    this.slug = slug
    this.introduction = introduction
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this._communityPlans = communityPlans || []
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

  getCommunityPlans(): CommunityPlan[] {
    return this._communityPlans
  }

  /**
   * Planの追加
   *
   * @param plan
   */
  addPlan(plan: Plan): void {
    const communityId = this.id

    const communityPlan = new CommunityPlan({
      planId: plan.getId(),
      communityId,
      createdAt: new Date(),
      updatedAt: new Date(),
      plan,
    })

    this._communityPlans.push(communityPlan)
  }
}
