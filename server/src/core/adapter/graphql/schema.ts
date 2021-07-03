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
    communityId: String!
  }

  input UpdateChannelInput {
    id: String!
    name: String
    slug: String
    isPrivate: Boolean
  }

  type Query {
    community: Community
  }

  type Community {
    id: String
    name: String
    slug: String
    introduction: String
    createdAt: Date
    updatedAt: Date
  }

  type Channel {
    id: String!
    slug: String!
    name: String!
    isPrivate: Boolean!
    # createdAt: Date!
  }

  type Mutation {
    createCommunity(input: CreateCommunityInput!): Community!
    createChannel(input: CreateChannelInput!): Channel!
    updateChannel(input: UpdateChannelInput!): Channel!
  }
`
