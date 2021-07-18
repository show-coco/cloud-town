import { ChannelRole } from '@prisma/client'
import {
  createTestChannel,
  createTestChannelAdmin,
  createTestChannelCommon,
  createTestChannelOwner,
  createTestCommunity,
  testuser1,
} from '../../../test/test-data'
import { InMemoryChannelRepository } from '../../adapter/repository/ChannelRepository/InMemoryChannelRepository'
import { InMemoryCommunityRepository } from '../../adapter/repository/CommunityRepository/InMemoryCommunityRepository'
import Channel from '../../domain/entities/ChannelAggregate/Channel'
import ChannelMember from '../../domain/entities/ChannelAggregate/ChannelMember'
import Community from '../../domain/entities/Community'
import ChannelUseCase from './ChannelUseCase'
import { CreateChannelProps, UpdateChannelProps } from './ChannelUseCaseParam'

describe('ChannelUseCase', () => {
  const communityRepo = new InMemoryCommunityRepository()
  const channelRepo = new InMemoryChannelRepository()
  const channelUseCase = new ChannelUseCase(channelRepo)
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

      expect(actual.currentOwner?.userId).toBe(createParam.userId)
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
        userId: testChannelOwner.userId || '',
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
        nextOwnerId: testChannelCommon.userId,
        currentOwnerId: testChannelOwner.userId,
      })

      const actual = await channelRepo.getChannelById(testChannel.id)
      expect(actual.currentOwner?.userId).toBe(testChannelCommon.userId)
    })

    it('チャンネルのオーナー以外はオーナー権限をメンバーに委譲できない', async () => {
      try {
        await channelUseCase.changeOwner({
          id: testChannel.id,
          nextOwnerId: testChannelCommon.userId,
          currentOwnerId: testChannelAdmin.userId,
        })
      } catch (error) {
        expect(error).toEqual(
          new Error("This user doesn't have authorization to change owner.")
        )
      }

      const actual = await channelRepo.getChannelById(testChannel.id)
      expect(actual.currentOwner?.userId).toBe(testChannelOwner.userId)

      try {
        await channelUseCase.changeOwner({
          id: testChannel.id,
          nextOwnerId: testChannelCommon.userId,
          currentOwnerId: testChannelCommon.userId,
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
        userId: testChannelOwner.userId,
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
        userId: testChannelAdmin.userId,
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
          userId: testChannelCommon.userId,
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
        userId: testChannelAdmin.userId,
      })

      const channel = await channelRepo.getChannelById(createTestChannel().id)
      expect(channel.getMember(testChannelAdmin.userId)?.role).toEqual(
        ChannelRole.LEAVED
      )
    })

    it('コモンは次のオーナー指定なしで脱退できる', async () => {
      await channelUseCase.leaveChannel({
        id: createTestChannel().id,
        userId: testChannelCommon.userId,
      })

      const channel = await channelRepo.getChannelById(createTestChannel().id)
      expect(channel.getMember(testChannelCommon.userId)?.role).toEqual(
        ChannelRole.LEAVED
      )
    })

    it('オーナーは次のオーナー指定しなければ脱退できない', async () => {
      try {
        await channelUseCase.leaveChannel({
          id: createTestChannel().id,
          userId: testChannelOwner.userId,
        })
      } catch (error) {
        expect(error).toEqual(new Error('The next owner is not specified'))
      }

      const channel = await channelRepo.getChannelById(createTestChannel().id)
      expect(channel.getMember(testChannelOwner.userId)?.role).toEqual(
        ChannelRole.OWNER
      )
    })

    it('オーナーは次のオーナーを指定して脱退できる', async () => {
      try {
        await channelUseCase.leaveChannel({
          id: createTestChannel().id,
          userId: testChannelOwner.userId,
          nextOwnerId: testChannelCommon.userId,
        })
      } catch (error) {
        expect(error).toEqual(new Error('The next owner is not specified'))
      }

      const channel = await channelRepo.getChannelById(createTestChannel().id)
      expect(channel.getMember(testChannelOwner.userId)?.role).toEqual(
        ChannelRole.LEAVED
      )
      expect(channel.getMember(testChannelCommon.userId)?.role).toEqual(
        ChannelRole.OWNER
      )
    })
  })
})
