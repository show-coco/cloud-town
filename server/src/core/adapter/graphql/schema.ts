import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  scalar Date

  input CreateCommunityInput {
    name: String!
    slug: String!
    introduction: String!
    plans: [CreatePlanInputWithNoCommunityId]
  }

  input CreatePlanInputWithNoCommunityId {
    name: String
    introduction: String!
    pricePerMonth: Int!
    trialPeriod: String!
    numberOfApplicants: Int!
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

  input GetCommunityInput {
    id: String!
  }

  input ChangeChannelOwnerInput {
    id: String!
    currentOwnerId: String!
    nextOwnerId: String!
  }

  type Query {
    community(input: GetCommunityInput!): Community
  }

  type Community {
    id: String
    name: String
    slug: String
    introduction: String
    createdAt: Date
    updatedAt: Date
    plans: [Plan]
  }

  type Plan {
    id: String
    name: String
    introduction: String
    pricePerMonth: Int
    trialPeriod: String!
    numberOfApplicants: Int!
    createdAt: Date
    updatedAt: Date
  }

  type Channel {
    id: String!
    slug: String!
    name: String!
    isPrivate: Boolean!
    members: [User!]
    # createdAt: Date!
  }

  type User {
    id: String!
    name: String!
    slug: String!
    email: String!
  }

  type Mutation {
    createCommunity(input: CreateCommunityInput!): Community!
    createChannel(input: CreateChannelInput!): Channel!
    updateChannel(input: UpdateChannelInput!): Channel!
    changeChannelOwner(input: ChangeChannelOwnerInput!): Channel!
  }
`
