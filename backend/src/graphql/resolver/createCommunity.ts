import { Prisma, PrismaClient } from '@prisma/client'
import {
  CreateCommunityInput,
  MutationResolvers,
  Plan,
} from '../../types/graphql'
import { v4 } from 'uuid'

const prisma = new PrismaClient()

export const COMMUNITY_CREATOR_ROLE = 'Owner'
export const COMMUNITY_CREATOR_STATUS = 'Joining'
export const CHANNEL_CREATOR_STATUS = 'Admin'

export const createCommunity: MutationResolvers['createCommunity'] = async (
  _,
  { input }
) => {
  console.log('createCommunity.input', input)

  const communityId = v4()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queries: any[] = [
    prisma.community.create({
      data: convertInputToPrisma(input, communityId),
    }),
    prisma.plan.createMany({
      data: convertPlanToPrisma(input.plans, communityId),
    }),
    prisma.community_member.create({
      data: {
        user_id: input.ownerId,
        community_id: communityId,
        role: COMMUNITY_CREATOR_ROLE,
        status: COMMUNITY_CREATOR_STATUS,
      },
    }),
  ]

  const channelCreateFlag = !input.chatUrl
  if (channelCreateFlag) {
    queries.push(
      createChannel({ communityId, name: 'general', ownerId: input.ownerId })
    )
    queries.push(
      createChannel({ communityId, name: 'random', ownerId: input.ownerId })
    )
  }

  if (input.hashtags) {
    queries.push(...upsertHashtags(input.hashtags, communityId))
  }

  await prisma.$transaction(queries)

  return communityId
}

const createChannel = ({
  communityId,
  ownerId,
  name,
}: {
  communityId: string
  ownerId: string
  name: string
}) => {
  return prisma.channel.create({
    data: {
      community_id: communityId,
      name,
      is_private: false,
      channel_member: {
        create: {
          user_id: ownerId,
          role: CHANNEL_CREATOR_STATUS,
        },
      },
    },
  })
}

const upsertHashtags = (hashTags: string[], communityId: string) => {
  return hashTags.map((hashTag) => {
    return prisma.hashtag.upsert({
      create: {
        id: v4(),
        name: hashTag,
        community_hashtag: {
          create: {
            community_id: communityId,
          },
        },
      },
      update: {
        name: hashTag,
        community_hashtag: {
          create: {
            community_id: communityId,
          },
        },
      },
      where: {
        name: hashTag,
      },
    })
  })
}

const convertInputToPrisma = (
  input: CreateCommunityInput,
  communityId: string
) => {
  const { name, slug, description, thumbnailUrl, title, category, chatUrl } =
    input

  return {
    id: communityId,
    name,
    slug,
    description,
    title,
    thumbnail_url: thumbnailUrl,
    category_id: category,
    chat_url: chatUrl,
  }
}

const convertPlanToPrisma = (
  plans: Plan[],
  communityId: string
): Prisma.Enumerable<Prisma.planCreateManyInput> => {
  return plans.map((plan) => ({
    name: plan.name,
    community_id: communityId,
    description: plan.description,
    trial_period: plan.trialPeriod,
    price_per_month: plan.pricePerMonth,
    number_of_applicants: plan.numberOfApplicants,
  }))
}
