import { ChannelRole } from '@prisma/client'
import {
  createTestChannel,
  createTestChannelAdmin,
  createTestChannelCommon,
  createTestChannelOwner,
  createTestCommunity,
  testuser1,
  testuser2,
  testuser3,
} from '../../../test/test-data'
import { InMemoryChannelRepository } from '../../adapter/repository/ChannelRepository/InMemoryChannelRepository'
import { InMemoryCommunityRepository } from '../../adapter/repository/CommunityRepository/InMemoryCommunityRepository'
import InMemoryUserRepository from '../../adapter/repository/UserRepository/InMemoryUserRepository'
import Channel from '../../domain/entities/ChannelAggregate/Channel'
import ChannelMember from '../../domain/entities/ChannelAggregate/ChannelMember'
import Community from '../../domain/entities/Community'
import ChannelUseCase from './ChannelUseCase'
import { CreateChannelProps, UpdateChannelProps } from './ChannelUseCaseParam'

describe('ChannelUseCase', () => {
  const communityRepo = new InMemoryCommunityRepository()
  const channelRepo = new InMemoryChannelRepository()
  const userRepo = new InMemoryUserRepository()
  const channelUseCase = new ChannelUseCase(channelRepo, userRepo)
  let testCommunity: Community
  let testChannel: Channel
  let testChannelOwner: ChannelMember
  let testChannelAdmin: ChannelMember
  let testChannelCommon: ChannelMember

  beforeEach(async () => {
    // テストデータの作成
    communityRepo.clean()
    channelRepo.clean()
    testCommunity = createTestCommunity()
    testChannel = createTestChannel()
    testChannelOwner = createTestChannelOwner()
    testChannelAdmin = createTestChannelAdmin()
    testChannelCommon = createTestChannelCommon()
    await userRepo.createUser(testuser1)
    await userRepo.createUser(testuser2)
    await userRepo.createUser(testuser3)
    await communityRepo.createCommunity(testCommunity)
    await channelRepo.save(testChannel)
  })

  afterAll(() => {
    // テストデータ削除
    communityRepo.clean()
    channelRepo.clean()
  })

  describe('createChannel', () => {
    it('チャンネル作成時に作成したユーザーがオーナーに追加される', async () => {
      const createParam: CreateChannelProps = {
        userId: testuser1.id,
        communityId: testCommunity.getCommunityId(),
        name: 'test community',
        isPrivate: false,
        slug: 'test-community',
      }

      const actual = await channelUseCase.createChannel(createParam)

      expect(actual.currentOwner?.id).toBe(createParam.userId)
    })
  })

  describe('updateChannel', () => {
    it('チャンネルに所属していないユーザーはチャンネル情報を更新できない', async () => {
      const notExistsUserId = 'abcde'

      const updateParam: UpdateChannelProps = {
        id: testChannel.id,
        userId: notExistsUserId,
        name: 'updated',
        isPrivate: false,
        slug: 'updated',
      }

      try {
        await channelUseCase.updateChannel(updateParam)
      } catch (e) {
        expect(e).toEqual(new Error("User doesn't exists in this channel"))
      }
    })

    it('チャンネルに所属しているユーザーはチャンネル情報を更新できる', async () => {
      const updateParam: UpdateChannelProps = {
        id: testChannel.id,
        userId: testChannelOwner.id || '',
        name: 'updated',
        isPrivate: true,
        slug: 'updated',
      }

      const actual = await channelUseCase.updateChannel(updateParam)

      expect(actual.name).toBe(updateParam.name)
      expect(actual.slug).toBe(updateParam.slug)
      expect(actual.isPrivate).toBe(updateParam.isPrivate)
    })
  })

  describe('changeOwner', () => {
    it('チャンネルのオーナーはオーナー権限をメンバーに委譲できる', async () => {
      await channelUseCase.changeOwner({
        id: testChannel.id,
        nextOwnerId: testChannelCommon.id,
        currentOwnerId: testChannelOwner.id,
      })

      const actual = await channelRepo.getChannelById(testChannel.id)
      expect(actual.currentOwner?.id).toBe(testChannelCommon.id)
    })

    it('チャンネルのオーナー以外はオーナー権限をメンバーに委譲できない', async () => {
      try {
        await channelUseCase.changeOwner({
          id: testChannel.id,
          nextOwnerId: testChannelCommon.id,
          currentOwnerId: testChannelAdmin.id,
        })
      } catch (error) {
        expect(error).toEqual(
          new Error("This user doesn't have authorization to change owner.")
        )
      }

      const actual = await channelRepo.getChannelById(testChannel.id)
      expect(actual.currentOwner?.id).toBe(testChannelOwner.id)

      try {
        await channelUseCase.changeOwner({
          id: testChannel.id,
          nextOwnerId: testChannelCommon.id,
          currentOwnerId: testChannelCommon.id,
        })
      } catch (error) {
        expect(error).toEqual(
          new Error("This user doesn't have authorization to change owner.")
        )
      }
    })
  })

  describe('deleteChannel', () => {
    it('チャンネルのオーナーはチャンネルを削除できる', async () => {
      await channelUseCase.deleteChannel({
        id: createTestChannel().id,
        userId: testChannelOwner.id,
      })

      try {
        await channelRepo.getChannelById(createTestChannel().id)
      } catch (error) {
        expect(error).toEqual(new Error('Channel not found'))
      }
    })

    it('チャンネルのアドミンはチャンネルを削除できる', async () => {
      await channelUseCase.deleteChannel({
        id: createTestChannel().id,
        userId: testChannelAdmin.id,
      })

      try {
        await channelRepo.getChannelById(createTestChannel().id)
      } catch (error) {
        expect(error).toEqual(new Error('Channel not found'))
      }
    })

    it('チャンネルのコモンはチャンネルを削除できない', async () => {
      try {
        await channelUseCase.deleteChannel({
          id: createTestChannel().id,
          userId: testChannelCommon.id,
        })
      } catch (error) {
        expect(error).toEqual(
          new Error('User does not have authorization to delete the channel')
        )
      }

      const channel = await channelRepo.getChannelById(createTestChannel().id)
      expect(channel.id).toBe(createTestChannel().id)
    })
  })

  describe('leave', () => {
    it('アドミンは次のオーナー指定なしで脱退できる', async () => {
      await channelUseCase.leaveChannel({
        id: createTestChannel().id,
        userId: testChannelAdmin.id,
      })

      const channel = await channelRepo.getChannelById(createTestChannel().id)
      expect(channel.getMember(testChannelAdmin.id)?.role).toEqual(
        ChannelRole.Leaved
      )
    })

    it('コモンは次のオーナー指定なしで脱退できる', async () => {
      await channelUseCase.leaveChannel({
        id: createTestChannel().id,
        userId: testChannelCommon.id,
      })

      const channel = await channelRepo.getChannelById(createTestChannel().id)
      expect(channel.getMember(testChannelCommon.id)?.role).toEqual(
        ChannelRole.Leaved
      )
    })

    it('オーナーは次のオーナー指定しなければ脱退できない', async () => {
      try {
        await channelUseCase.leaveChannel({
          id: createTestChannel().id,
          userId: testChannelOwner.id,
        })
      } catch (error) {
        expect(error).toEqual(new Error('The next owner is not specified'))
      }

      const channel = await channelRepo.getChannelById(createTestChannel().id)
      expect(channel.getMember(testChannelOwner.id)?.role).toEqual(
        ChannelRole.Owner
      )
    })

    it('オーナーは次のオーナーを指定して脱退できる', async () => {
      try {
        await channelUseCase.leaveChannel({
          id: createTestChannel().id,
          userId: testChannelOwner.id,
          nextOwnerId: testChannelCommon.id,
        })
      } catch (error) {
        expect(error).toEqual(new Error('The next owner is not specified'))
      }

      const channel = await channelRepo.getChannelById(createTestChannel().id)
      expect(channel.getMember(testChannelOwner.id)?.role).toEqual(
        ChannelRole.Leaved
      )
      expect(channel.getMember(testChannelCommon.id)?.role).toEqual(
        ChannelRole.Owner
      )
    })
  })
})
