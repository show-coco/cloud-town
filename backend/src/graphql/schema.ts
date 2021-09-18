import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input CreateCommunityInput {
    name: String!
    slug: String!
    title: String!
    description: String!
    thumbnailUrl: String!
  }

  type Mutation {
    createCommunity(input: CreateCommunityInput!): String!
  }

  type Query {
    healthCheck: Boolean!
  }
`
