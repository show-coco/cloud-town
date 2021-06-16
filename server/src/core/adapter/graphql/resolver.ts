import { Resolvers } from '../../../types/graphql'
import CommunityUseCase from '../../usecase/community/CommunityUseCase'
import PCommunityRepository from '../repository/CommunityRepository/PCommunityRepository'

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
  Query: {
    books: (_parent, _args, context) => {
      if (!context.user) return null

      return books
    },
    community: async (_parent, _args, context) => {
      const com = await communityUseCase.getCommunityById(1)

      if (!com) return null

      return {
        id: com.getCommunityId(),
      }
    },
  },
}
