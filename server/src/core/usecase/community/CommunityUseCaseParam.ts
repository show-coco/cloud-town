import { TrailPeriod } from '@prisma/client'

export interface CreateCommunityParam {
  name: string
  slug: string
  introduction: string
  plans: {
    name: string
    introduction: string
    pricePerMonth: number
    trailPeriod: TrailPeriod | null
    numberOfApplicants: number
  }[]
}
