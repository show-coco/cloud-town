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
import Community from '../../domain/entities/Community'
import ChannelUseCase from './ChannelUseCase'
import { CreateChannelProps, UpdateChannelProps } from './ChannelUseCaseProps'

describe('ChannelUseCase', () => {
  const communityRepo = new InMemoryCommunityRepository()
  const channelRepo = new InMemoryChannelRepository()
  const channelUseCase = new ChannelUseCase(channelRepo)
  let testCommunity: Community
  let testChannel: Channel

  beforeEach(async () => {
    // テストデータの作成
    communityRepo.clean()
    channelRepo.clean()
    testCommunity = createTestCommunity()
    testChannel = createTestChannel()
    console.log(testChannel)
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
        userId: testuser1.getId(),
        communityId: testCommunity.getCommunityId(),
        name: 'test community',
        isPrivate: false,
        slug: 'test-community',
      }

      const actual = await channelUseCase.createChannel(createParam)

      expect(actual.currentOwner()?.userId).toBe(createParam.userId)
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
        userId: createTestChannelOwner().userId || '',
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
        nextOwnerId: createTestChannelCommon().userId,
        currentOwnerId: createTestChannelOwner().userId,
      })

      const actual = await channelRepo.getChannelById(testChannel.id)
      expect(actual.currentOwner()?.userId).toBe(
        createTestChannelCommon().userId
      )
    })

    it('チャンネルのオーナー以外はオーナー権限をメンバーに委譲できない', async () => {
      try {
        await channelUseCase.changeOwner({
          id: testChannel.id,
          nextOwnerId: createTestChannelCommon().userId,
          currentOwnerId: createTestChannelAdmin().userId,
        })
      } catch (error) {
        expect(error).toEqual(
          new Error("This user doesn't have authorization to change owner.")
        )
      }

      const actual = await channelRepo.getChannelById(testChannel.id)
      expect(actual.currentOwner()?.userId).toBe(
        createTestChannelOwner().userId
      )

      try {
        await channelUseCase.changeOwner({
          id: testChannel.id,
          nextOwnerId: createTestChannelCommon().userId,
          currentOwnerId: createTestChannelCommon().userId,
        })
      } catch (error) {
        expect(error).toEqual(
          new Error("This user doesn't have authorization to change owner.")
        )
      }
    })
  })
})
