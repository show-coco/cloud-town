import Plan from './Plan'

export default class CommunityPlan {
  private _communityId: string
  private _planId: string
  private _createdAt: Date
  private _updatedAt: Date
  private _plan: Plan

  constructor({
    communityId,
    planId,
    createdAt,
    updatedAt,
    plan,
  }: {
    communityId: string
    planId: string
    createdAt: Date
    updatedAt: Date
    plan: Plan
  }) {
    this._communityId = communityId
    this._planId = planId
    this._createdAt = createdAt
    this._updatedAt = updatedAt
    this._plan = plan
  }

  /** CommunityId */
  getCommunityId(): string {
    return this._communityId
  }

  /** PlanId */
  getPlanId(): string {
    return this._planId
  }

  getCreatedAt(): Date {
    return this._createdAt
  }

  getUpdatedAt(): Date {
    return this._updatedAt
  }

  getPlan(): Plan {
    return this._plan
  }
}
