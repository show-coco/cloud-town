import { Resolvers, ChannelRole } from '../../../types/graphql'
import ChatUseCase from '../../usecase/chat/channel/ChannelUseCase'
import CommunityUseCase from '../../usecase/community/CommunityUseCase'
import PChannelRepository from '../repository/ChannelRepository/PChannelRepository'
import PCommunityRepository from '../repository/CommunityRepository/PCommunityRepository'
import { Context } from '../../../types/context'
import { dateScalar } from './scalar'
import PUserRepository from '../repository/UserRepository/PUserRepository'

const communityRepo = new PCommunityRepository()
const communityUseCase = new CommunityUseCase(communityRepo)

const channelRepo = new PChannelRepository()
const userRepo = new PUserRepository()
const channelUseCase = new ChatUseCase(channelRepo, userRepo)

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

      return members.map((member) => {
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
      })
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
      })

      return {
        id: com.getCommunityId(),
        name: com.getName(),
        slug: com.getSlug(),
        introduction: com.getIntroduction(),
        createdAt: com.getCreatedAt(),
        updatedAt: com.getUpdatedAt(),
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
  },
}
