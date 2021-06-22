import { Resolvers } from '../../../types/graphql'
import CommunityUseCase from '../../usecase/community/CommunityUseCase'
import PCommunityRepository from '../repository/CommunityRepository/PCommunityRepository'
import { Context } from '../../../types/context'
import { dateScalar } from './scalar'

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

export const resolvers: Resolvers = {
  Date: dateScalar,

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
        slug: com.getSlug(),
        introduction: com.getIntroduction(),
        createdAt: com.getCreatedAt(),
        updatedAt: com.getUpdatedAt(),
      }
    },
  },
  Mutation: {
    createCommunity: async (_parent, args, context: Context) => {
      console.log('resolvers createCommunity args', {
        args,
      })

      const com = await communityUseCase.createCommunity({
        name: args.input?.name,
        slug: args.input?.slug,
        introduction: args.input?.introduction,
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
  },
}
