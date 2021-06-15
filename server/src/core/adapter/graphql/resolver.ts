import { Resolvers } from '../../../types/graphql'
import CommunityService from '../../service/CommunityService'
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
const communityService = new CommunityService(communityRepo)

export const resolvers: Resolvers = {
  Query: {
    books: (_parent, _args, context) => {
      if (!context.user) return null

      return books
    },
    community: async (_parent, _args, context) => {
      const com = await communityService.getCommunityById(1)

      if (!com) return null

      return {
        id: com.getCommunityId(),
      }
    },
  },
}
