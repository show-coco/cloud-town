import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  scalar Date

  input GetCommunityInput {
    id: String!
  }

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

  input DeleteChannelInput {
    id: String!
  }

  input GetChannelsInput {
    joining: Boolean
    isPrivate: Boolean
  }

  input GetChannelInput {
    id: String!
  }

  input ChangeChannelOwnerInput {
    id: String!
    currentOwnerId: String!
    nextOwnerId: String!
  }

  input LeaveChannelInput {
    id: String!
    nextOwnerId: String
  }

  input JoinChannelInput {
    id: String!
  }

  input KickMemberFromChannelInput {
    id: String!
    memberId: String!
  }

  input AddMemberToChannelInput {
    id: String!
    memberIds: [String!]!
  }

  type Community {
    id: String!
    name: String!
    slug: String!
    introduction: String!
    createdAt: Date!
    updatedAt: Date!
    channels: [Channel!]
    plans: [Plan]
    channels(input: GetChannelsInput): [Channel!]
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
    members: [ChannelMember!]
    # createdAt: Date!
  }

  enum ChannelRole {
    OWNER
    ADMIN
    COMMON
    LEAVED
  }

  type ChannelMember {
    id: String!
    name: String!
    slug: String!
    email: String!
    role: ChannelRole!
  }

  type MutationResponse {
    ok: Boolean!
  }

  type Query {
    community(input: GetCommunityInput!): Community
    channel(input: GetChannelInput!): Channel!
  }

  type Mutation {
    createCommunity(input: CreateCommunityInput!): Community!
    createChannel(input: CreateChannelInput!): Channel!
    updateChannel(input: UpdateChannelInput!): Channel!
    changeChannelOwner(input: ChangeChannelOwnerInput!): Channel!
    deleteChannel(input: DeleteChannelInput!): MutationResponse!
    leaveChannel(input: LeaveChannelInput!): MutationResponse!
    joinChannel(input: JoinChannelInput!): Channel!
    kickMemberFromChannel(input: KickMemberFromChannelInput!): Channel!
    addMemberToChannel(input: AddMemberToChannelInput!): Channel!
  }
`
