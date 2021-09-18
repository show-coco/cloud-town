import { Resolvers } from '../../types/graphql'
import { createCommunity } from './createCommunity'

export const resolvers: Resolvers = {
  Mutation: {
    createCommunity,
  },
  Query: {
    healthCheck: () => {
      return true
    },
  },
}
