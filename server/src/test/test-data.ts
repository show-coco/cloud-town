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

export const testuser0 = new User({
  id: '09b913db-3733-4e65-9f48-6a74af892495',
  name: 'test user',
  slug: 'test-user',
  email: 'test@example.com',
  googleId: '123456abcde',
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
    id: testuser1.id,
    slug: testuser1.slug,
    googleId: testuser1.googleId,
    email: testuser1.email,
    name: testuser1.name,
    memberId: 1,
    role: ChannelRole.Admin,
  })

export const createTestChannelOwner = (): ChannelMember =>
  new ChannelMember({
    id: testuser2.id,
    slug: testuser2.slug,
    googleId: testuser2.googleId,
    email: testuser2.email,
    name: testuser2.name,
    memberId: 2,
    role: ChannelRole.Owner,
  })

export const createTestChannelCommon = (): ChannelMember =>
  new ChannelMember({
    id: testuser3.id,
    slug: testuser3.slug,
    googleId: testuser3.googleId,
    email: testuser3.email,
    name: testuser3.name,
    memberId: 3,
    role: ChannelRole.Common,
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
