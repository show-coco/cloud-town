import {
  Resolvers,
  ChannelRole,
  Thread as GThread,
  ChannelMember as GChannelMember,
  Reply as GReply,
  Plan,
} from '../../../types/graphql'
import ChatUseCase from '../../usecase/chat/channel/ChannelUseCase'
import CommunityUseCase from '../../usecase/community/CommunityUseCase'
import PChannelRepository from '../repository/ChannelRepository/PChannelRepository'
import PCommunityRepository from '../repository/CommunityRepository/PCommunityRepository'
import { Context } from '../../../types/context'
import { dateScalar } from './scalar'
import PUserRepository from '../repository/UserRepository/PUserRepository'
import ChannelMember from '../../domain/entities/ChannelAggregate/ChannelMember'
import PThreadRepository from '../repository/ThreadRepository/PThreadRepository'
import MessageUseCase, {
  ReplyUCOutput,
  ThreadUCOutput,
} from '../../usecase/chat/message/MessageUseCase'
import { CreateCommunityParam } from '../../usecase/community/CommunityUseCaseParam'
import { PubSub, withFilter } from 'graphql-subscriptions'

const pubsub = new PubSub()

const communityRepo = new PCommunityRepository()
const channelRepo = new PChannelRepository()
const userRepo = new PUserRepository()
const threadRepo = new PThreadRepository()

const communityUseCase = new CommunityUseCase(communityRepo)
const channelUseCase = new ChatUseCase(channelRepo, userRepo)

const messageUseCase = new MessageUseCase(threadRepo, channelRepo)

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
    channel: async (_parent, args, _context: Context) => {
      const { id } = args.input
      const channel = await channelUseCase.getChannelDetailsById(id)

      return channel
    },
    thread: async (_parent, args, context: Context) => {
      if (!context.user) throw new Error('Not Authenticated')

      const { id } = args.input
      const userId = context.user.sub

      const thread = await messageUseCase.getThreadDetail(id, userId)

      return mapThreadToSchema(thread)
    },
  },
  Community: {
    channels: async (community, args, context) => {
      const { id } = community
      const isPrivate = args.input?.isPrivate
      const joining = args.input?.joining

      if (
        (typeof isPrivate === 'boolean' || typeof isPrivate === 'undefined') &&
        (typeof joining === 'boolean' || typeof joining === 'undefined')
      ) {
        return channelUseCase.getChannelList({
          communityId: id,
          isPrivate,
          userId: context.user?.sub,
          joining,
        })
      }

      throw new Error('Input type is strange')
    },
  },
  Channel: {
    members: async (channel) => {
      const members = await channelUseCase.getMemberList(channel.id)

      return members.map((member) => mapChannelMemberToSchema(member))
    },
  },
  Mutation: {
    createCommunity: async (_parent, args, _context: Context) => {
      console.log('resolvers createCommunity args', {
        args,
      })

      const plans =
        args.input.plans
          ?.map((plan) => {
            if (!plan) {
              return undefined
            }

            return {
              name: plan.name?.toString(),
              introduction: plan.introduction,
              pricePerMonth: plan.pricePerMonth,
              trialPeriod: plan.trialPeriod,
              numberOfApplicants: plan.numberOfApplicants as number | null,
            }
          })
          .filter((v) => !v) || []

      const com = await communityUseCase.createCommunity({
        name: args.input.name,
        slug: args.input.slug,
        introduction: args.input.introduction,
        plans: plans,
      } as CreateCommunityParam)

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
    deleteChannel: async (_parent, args, context) => {
      if (!context.user) throw new Error('Not Authenticated')

      const { id } = args.input
      const userId = context.user.sub

      await channelUseCase.deleteChannel({ id, userId })

      return {
        ok: true,
      }
    },
    leaveChannel: async (_parent, args, context) => {
      if (!context.user) throw new Error('Not Authenticated')

      const { id, nextOwnerId } = args.input
      const userId = context.user.sub

      if (
        typeof nextOwnerId === 'string' ||
        typeof nextOwnerId === 'undefined'
      ) {
        await channelUseCase.leaveChannel({ id, nextOwnerId, userId })

        return {
          ok: true,
        }
      }

      throw new Error('Input type is strange')
    },
    joinChannel: async (_parent, args, context: Context) => {
      if (!context.user) throw new Error('Not Authenticated')

      const { id } = args.input
      const userId = context.user.sub

      return channelUseCase.joinChannel({ id, userId })
    },
    kickMemberFromChannel: async (_parent, args, context: Context) => {
      if (!context.user) throw new Error('Not Authenticated')

      const { id, memberId } = args.input
      const userId = context.user.sub

      return channelUseCase.kickMember({ id, userId, memberId })
    },
    addMemberToChannel: async (_parent, args, context: Context) => {
      if (!context.user) throw new Error('Not Authenticated')

      const { id, memberIds } = args.input
      const userId = context.user.sub

      return channelUseCase.addMembers({ id, userId, memberIds })
    },
    postThread: async (_parent, args, context: Context) => {
      if (!context.user) throw new Error('Not Authenticated')

      const { channelId, content } = args.input
      const senderId = context.user.sub

      const thread = await messageUseCase.postThread({
        senderId,
        channelId,
        content,
      })

      await pubsub.publish('THREAD_POSTED', {
        threadPosted: mapThreadToSchema(thread),
      })
      return mapThreadToSchema(thread)
    },
    postReply: async (_parent, args, context: Context) => {
      if (!context.user) throw new Error('Not Authenticated')

      const { threadId, content } = args.input
      const senderId = context.user.sub
      const reply = await messageUseCase.postReply({
        threadId,
        content,
        senderId,
      })

      await pubsub.publish('REPLY_POSTED', {
        replyPosted: mapReplyToSchema(reply),
      })
      return mapReplyToSchema(reply)
    },
    updateMessage: async (_parent, args, context: Context) => {
      if (!context.user) throw new Error('Not Authenticated')

      const { id, content, pinned } = args.input
      const userId = context.user.sub

      if (
        (typeof content === 'string' || typeof content === 'undefined') &&
        (typeof pinned === 'boolean' || typeof pinned === 'undefined')
      ) {
        const thread = await messageUseCase.update({
          id,
          content,
          pinned,
          userId,
        })
        await pubsub.publish('THREAD_POSTED', {
          threadPosted: mapThreadToSchema(thread),
        })
        return mapThreadToSchema(thread)
      }

      throw new Error('Input type is strange')
    },
    addReaction: async (_parent, args, context: Context) => {
      if (!context.user) throw new Error('Not Authenticated')

      const { id, emoji } = args.input
      const senderId = context.user.sub
      const thread = await messageUseCase.addReaction({ id, emoji, senderId })
      await pubsub.publish('THREAD_POSTED', {
        threadPosted: mapThreadToSchema(thread),
      })
      return mapThreadToSchema(thread)
    },
  },
  Subscription: {
    threadPosted: {
      // チャンネルに所属していればスレッドを受け取る
      subscribe: withFilter(
        () => pubsub.asyncIterator(['THREAD_POSTED']),
        async (
          payload: { threadPosted: GThread },
          _variables,
          context: Context
        ) => {
          const userId = context.user?.sub
          if (!userId) throw new Error('Not Authenticated')

          const channel = await channelRepo.getChannelById(
            payload.threadPosted.channel.id
          )

          return Boolean(channel.getMember(userId))
        }
      ),
    },
    replyPosted: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['REPLY_POSTED']),
        async (
          payload: { replyPosted: GReply },
          _variables,
          context: Context
        ) => {
          const userId = context.user?.sub
          if (!userId) throw new Error('Not Authenticated')

          const channel = await channelRepo.getChannelById(
            payload.replyPosted.channel.id
          )

          return Boolean(channel.getMember(userId))
        }
      ),
    },
  },
}

const mapThreadToSchema = (thread: ThreadUCOutput): GThread => {
  const gThread = {
    id: thread.id,
    content: thread.content,
    pinned: thread.pinned,
    slug: thread.slug,
    channel: thread.channel,
    sender: mapChannelMemberToSchema(thread.sender),
    reactinos: thread.reactions?.map((reaction) => ({
      id: reaction.id,
      emoji: reaction.emoji,
      sender: mapChannelMemberToSchema(reaction.sender),
    })),
  }

  return {
    ...gThread,
    replies: thread.replies?.map<GReply>((reply) => mapReplyToSchema(reply)),
  }
}

const mapReplyToSchema = (reply: ReplyUCOutput): GReply => {
  return {
    content: reply.content,
    id: reply.id,
    pinned: reply.pinned,
    slug: reply.slug,
    channel: reply.channel,
    sender: mapChannelMemberToSchema(reply.sender),
    reactinos: reply.reactions?.map((reaction) => ({
      id: reaction.id,
      emoji: reaction.emoji,
      sender: mapChannelMemberToSchema(reaction.sender),
    })),
  }
}

const mapChannelMemberToSchema = (member: ChannelMember): GChannelMember => {
  let role: ChannelRole
  switch (member.role) {
    case 'Admin':
      role = ChannelRole.Admin
      break
    case 'Common':
      role = ChannelRole.Common
      break
    case 'Leaved':
      role = ChannelRole.Leaved
      break
    case 'Owner':
      role = ChannelRole.Owner
  }

  return {
    id: member.id,
    slug: member.slug,
    name: member.name,
    email: member.email,
    role,
  }
}
