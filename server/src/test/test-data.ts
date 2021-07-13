import { ChannelRole } from '@prisma/client'
import Channel from '../core/domain/entities/ChannelAggregate/Channel'
import ChannelMember from '../core/domain/entities/ChannelAggregate/ChannelMember'
import Community from '../core/domain/entities/Community'
import User from '../core/domain/entities/User'

export const createTestCommunity = (): Community =>
  new Community({
    id: '3d109f8e-3248-419e-b125-284638dce331',
    name: 'test community',
    slug: 'test-community',
    introduction: 'description',
    createdAt: new Date(),
    updatedAt: new Date(),
  })

export const testuser1 = new User({
  id: 'a9b913db-3733-4e65-9f48-6a74af892495',
  name: 'test user',
  slug: 'test-user',
  email: 'test@example.com',
  googleId: '123456abcde',
})

export const testuser2 = new User({
  id: 'b9b913db-3733-4e65-9f48-6a74af892495',
  name: 'test user',
  slug: 'test-user',
  email: 'test@example.com',
  googleId: '123456abcde',
})

export const testuser3 = new User({
  id: 'c9b913db-3733-4e65-9f48-6a74af892495',
  name: 'test user',
  slug: 'test-user',
  email: 'test@example.com',
  googleId: '123456abcde',
})

export const createTestChannelAdmin = (): ChannelMember =>
  new ChannelMember({
    id: 1,
    userId: testuser1.getId(),
    channelId: 'a4b2d1f6-f034-4dd6-8009-399ada731b32',
    role: ChannelRole.ADMIN,
  })

export const createTestChannelOwner = (): ChannelMember =>
  new ChannelMember({
    id: 2,
    userId: testuser2.getId(),
    channelId: 'a4b2d1f6-f034-4dd6-8009-399ada731b32',
    role: ChannelRole.OWNER,
  })

export const createTestChannelCommon = (): ChannelMember =>
  new ChannelMember({
    id: 3,
    userId: testuser3.getId(),
    channelId: 'a4b2d1f6-f034-4dd6-8009-399ada731b32',
    role: ChannelRole.COMMON,
  })

export const createTestChannel = (): Channel =>
  new Channel({
    id: 'a4b2d1f6-f034-4dd6-8009-399ada731b32',
    name: 'test channel',
    slug: 'test-channel',
    isPrivate: false,
    channelMember: [
      createTestChannelOwner(),
      createTestChannelAdmin(),
      createTestChannelCommon(),
    ],
    communityId: createTestCommunity().getCommunityId(),
  })
