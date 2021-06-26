import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  scalar Date

  input CreateCommunityInput {
    name: String!
    slug: String!
    introduction: String!
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
    slug: String
    introduction: String
    createdAt: Date
    updatedAt: Date
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
