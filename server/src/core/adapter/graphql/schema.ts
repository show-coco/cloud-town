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
    books: [Book]
    community: Community
  }

  type Book {
    title: String
    author: String
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
