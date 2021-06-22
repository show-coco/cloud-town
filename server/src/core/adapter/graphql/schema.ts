import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input CreateCommunityInput {
    name: String!
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

  type Mutation {
    createCommunity(input: CreateCommunityInput!): Community
  }
`
