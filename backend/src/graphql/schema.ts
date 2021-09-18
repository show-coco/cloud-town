import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  enum TrialPeriod {
    OneDay
    ThreeDays
    OneMonth
    TwoMonth
    ThreeMonth
  }

  input Plan {
    name: String!
    pricePerMonth: Int!
    description: String!
    isPrivate: Boolean!
    trialPeriod: TrialPeriod
    numberOfApplicants: Int
  }

  input CreateCommunityInput {
    ownerId: String!
    name: String!
    slug: String!
    title: String!
    description: String!
    thumbnailUrl: String!
    category: String!
    chatUrl: String
    plans: [Plan!]!
    hashtags: [String!]
  }

  type Mutation {
    createCommunity(input: CreateCommunityInput!): String!
  }

  type Query {
    healthCheck: Boolean!
  }
`
