import { TrailPeriod } from '@prisma/client'
import { v4 } from 'uuid'

export default class Plan {
  private id: string
  /** プラン名 */
  private _name: string
  /** プラン紹介文 */
  private _introduction: string
  /** ひと月あたりの金額 */
  private _pricePerMonth: number
  /** 無料期間 */
  private _trailPeriod: TrailPeriod | null
  /** 募集人数 */
  private _numberOfApplicants: number | null
  private _createdAt: Date
  private _updatedAt: Date

  constructor({
    id,
    name,
    introduction,
    pricePerMonth,
    trailPeriod,
    numberOfApplicants,
    createdAt,
    updatedAt,
  }: {
    id?: string
    name: string
    introduction: string
    pricePerMonth: number
    trailPeriod: TrailPeriod | null
    numberOfApplicants: number | null
    createdAt: Date
    updatedAt: Date
  }) {
    this.id = id || v4()
    this._name = name
    this._introduction = introduction
    this._pricePerMonth = pricePerMonth
    this._trailPeriod = trailPeriod
    this._numberOfApplicants = numberOfApplicants
    this._createdAt = createdAt
    this._updatedAt = updatedAt
  }

  /** id */
  getId(): string {
    return this.id
  }

  /** プラン名 */
  getName(): string {
    return this._name
  }

  /** プラン紹介文 */
  getIntroduction(): string {
    return this._introduction
  }

  /** ひと月あたりの金額 */
  getPricePerMonth(): number {
    return this._pricePerMonth
  }

  /** 無料期間 */
  getTrailPeriod(): TrailPeriod | null {
    return this._trailPeriod
  }

  /** 募集人数 */
  getNumberOfApplicants(): number | null {
    return this._numberOfApplicants
  }

  getCreatedAt(): Date {
    return this._createdAt
  }

  getUpdatedAt(): Date {
    return this._updatedAt
  }
}
