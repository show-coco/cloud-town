import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input CreateCommunityInput {
    name: String!
  }

  input CreateChannelInput {
    slug: String!
    name: String!
    isPrivate: Boolean!
    communityId: Int!
  }

  type Query {
    community: Community
  }

  type Community {
    id: Int
    name: String
  }

  type Channel {
    id: Int!
    slug: String!
    name: String!
    isPrivate: Boolean!
    # createdAt: Date!
  }

  type Mutation {
    createCommunity(input: CreateCommunityInput!): Community
    createChannel(input: CreateChannelInput!): Channel
  }
`
