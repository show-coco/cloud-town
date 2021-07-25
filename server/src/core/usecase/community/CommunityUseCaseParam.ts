import { TrialPeriod } from '@prisma/client'

export interface CreateCommunityParam {
  name: string
  slug: string
  introduction: string
  plans: {
    name: string
    introduction: string
    pricePerMonth: number
    trialPeriod: string | TrialPeriod | null
    numberOfApplicants: number | null
  }[]
}
