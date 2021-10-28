import { TrialPeriod } from '@prisma/client'

export interface CreatePlanParam {
  name: string
  introduction: string
  pricePerMonth: number
  trialPeriod: string | TrialPeriod | null
  numberOfApplicants: number | null
}
