import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  scalar Date

  input CreateCommunityInput {
    name: String!
    slug: String!
    introduction: String!
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
    slug: String
    introduction: String
    createdAt: Date
    updatedAt: Date
  }

  type Mutation {
    createCommunity(input: CreateCommunityInput!): Community
  }
`
