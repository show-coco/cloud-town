import { Resolvers } from '../../../types/graphql'
import CommunityUseCase from '../../usecase/community/CommunityUseCase'
import PCommunityRepository from '../repository/CommunityRepository/PCommunityRepository'
import { Context } from '../../../types/context'
import PChannelRepository from '../repository/ChannelRepository/PChannelRepository'
import ChatUseCase from '../../usecase/chat/ChannelUseCase'

const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
]

const communityRepo = new PCommunityRepository()
const communityUseCase = new CommunityUseCase(communityRepo)

const channelRepo = new PChannelRepository()
const channelUseCase = new ChatUseCase(channelRepo)

export const resolvers: Resolvers = {
  Query: {
    books: (_parent, _args, context: Context) => {
      if (!context.user) return null

      return books
    },
    community: async (_parent, _args, context: Context) => {
      const com = await communityUseCase.getCommunityById(1)

      if (!com) return null

      return {
        id: com.getCommunityId(),
        name: com.getName(),
      }
    },
  },
  Mutation: {
    createCommunity: async (_parent, args, context: Context) => {
      const com = await communityUseCase.createCommunity({
        name: args.input.name,
      })

      return {
        id: com.getCommunityId(),
        name: com.getName(),
      }
    },
    createChannel: async (_parent, args, context: Context) => {
      // TODO: 認証ミドルウェアを作成する
      if (!context.user) throw new Error('Not Authenticated')

      const { name, slug, isPrivate, communityId } = args.input
      const userId = Number(context.user.sub)

      const channel = await channelUseCase.createChannel({
        name,
        slug,
        isPrivate,
        communityId,
        userId,
      })

      return {
        id: channel.getId(),
        name: channel.getName(),
        slug: channel.getSlug(),
        isPrivate: channel.getIsPrivate(),
      }
    },
  },
}
