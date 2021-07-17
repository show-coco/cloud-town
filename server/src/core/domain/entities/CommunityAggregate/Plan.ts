import { TrialPeriod } from '@prisma/client'
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
  private _trialPeriod: TrialPeriod | null
  /** 募集人数 */
  private _numberOfApplicants: number | null
  private _createdAt: Date
  private _updatedAt: Date

  constructor({
    id,
    name,
    introduction,
    pricePerMonth,
    trialPeriod,
    numberOfApplicants,
    createdAt,
    updatedAt,
  }: {
    id?: string
    name: string
    introduction: string
    pricePerMonth: number
    trialPeriod: TrialPeriod | null
    numberOfApplicants: number | null
    createdAt: Date
    updatedAt: Date
  }) {
    this.id = id || v4()
    this._name = name
    this._introduction = introduction
    this._pricePerMonth = pricePerMonth
    this._trialPeriod = trialPeriod
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
  getTrialPeriod(): TrialPeriod | null {
    return this._trialPeriod
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
