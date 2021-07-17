import { Plan, Resolvers } from '../../../types/graphql'
import ChatUseCase from '../../usecase/chat/ChannelUseCase'
import CommunityUseCase from '../../usecase/community/CommunityUseCase'
import PChannelRepository from '../repository/ChannelRepository/PChannelRepository'
import PCommunityRepository from '../repository/CommunityRepository/PCommunityRepository'
import { Context } from '../../../types/context'
import { dateScalar } from './scalar'

const communityRepo = new PCommunityRepository()
const communityUseCase = new CommunityUseCase(communityRepo)

const channelRepo = new PChannelRepository()
const channelUseCase = new ChatUseCase(channelRepo)

export const resolvers: Resolvers = {
  Date: dateScalar,

  Query: {
    community: async (_parent, args, _context: Context) => {
      const { id } = args.input
      const com = await communityUseCase.getCommunityById(id)

      if (!com) return null

      return {
        id: com.getCommunityId(),
        name: com.getName(),
        slug: com.getSlug(),
        introduction: com.getIntroduction(),
        createdAt: com.getCreatedAt(),
        updatedAt: com.getUpdatedAt(),
      }
    },
  },
  Community: {
    channels: async (community) => {
      return channelUseCase.getChannelList(community.id)
    },
  },
  Channel: {
    members: async (channel) => {
      const members = await channelUseCase.getMemberList(channel.id)

      return members.map((member) => ({
        id: member.id,
        slug: member.slug,
        name: member.name,
        email: member.email,
      }))
    },
  },
  Mutation: {
    createCommunity: async (_parent, args, _context: Context) => {
      console.log('resolvers createCommunity args', {
        args,
      })

      const com = await communityUseCase.createCommunity({
        name: args.input.name,
        slug: args.input.slug,
        introduction: args.input.introduction,
        plans: args.input.plans || [],
      })

      return {
        id: com.getCommunityId(),
        name: com.getName(),
        slug: com.getSlug(),
        introduction: com.getIntroduction(),
        createdAt: com.getCreatedAt(),
        updatedAt: com.getUpdatedAt(),
        plans: com.getCommunityPlans().map(
          (communityPlan): Plan => ({
            id: communityPlan.getPlan().getId(),
            name: communityPlan.getPlan().getName(),
            introduction: communityPlan.getPlan().getIntroduction(),
            pricePerMonth: communityPlan.getPlan().getPricePerMonth(),
            trialPeriod: communityPlan.getPlan().getTrialPeriod() as string,
            numberOfApplicants: communityPlan
              .getPlan()
              .getNumberOfApplicants() as number,
            createdAt: communityPlan.getPlan().getCreatedAt(),
            updatedAt: communityPlan.getPlan().getUpdatedAt(),
          })
        ),
      }
    },
    createChannel: async (_parent, args, context: Context) => {
      if (!context.user) throw new Error('Not Authenticated')

      const { name, slug, isPrivate, communityId } = args.input
      const userId = context.user.sub

      const channel = await channelUseCase.createChannel({
        name,
        slug,
        isPrivate,
        communityId,
        userId,
      })

      return {
        id: channel.id,
        name: channel.name,
        slug: channel.slug,
        isPrivate: channel.isPrivate,
      }
    },
    updateChannel: async (_parent, args, context) => {
      if (!context.user) throw new Error('Not Authenticated')

      const { id, name, slug, isPrivate } = args.input

      if (
        typeof name === 'string' &&
        typeof slug === 'string' &&
        typeof isPrivate === 'boolean'
      ) {
        const channel = await channelUseCase.updateChannel({
          id,
          slug,
          name,
          isPrivate,
          userId: context.user.sub,
        })

        return channel
      } else {
        throw new Error('Input type is strange')
      }
    },
    changeChannelOwner: async (_parent, args, context) => {
      if (!context.user) throw new Error('Not Authenticated')

      const channel = await channelUseCase.changeOwner({ ...args.input })
      return channel
    },
  },
}
