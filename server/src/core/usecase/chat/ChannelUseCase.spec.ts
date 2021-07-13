import { testCommunity } from '../../../test/test-data'
import { InMemoryChannelRepository } from '../../adapter/repository/ChannelRepository/InMemoryChannelRepository'
import { InMemoryCommunityRepository } from '../../adapter/repository/CommunityRepository/InMemoryCommunityRepository'
import ChannelUseCase from './ChannelUseCase'
import { CreateChannelProps, UpdateChannelProps } from './ChannelUseCaseProps'

const testUserId = '5243148e-1f08-2d5c-afac-c8c0b4c94285'

describe('ChannelUseCase', () => {
  const communityRepo = new InMemoryCommunityRepository()
  const channelRepo = new InMemoryChannelRepository()
  const channelUseCase = new ChannelUseCase(channelRepo)

  beforeAll(async () => {
    // テストデータの作成
    await communityRepo.createCommunity(testCommunity)
  })

  afterAll(() => {
    // テストデータ削除
    communityRepo.clean()
    channelRepo.clean()
  })

  describe('createChannel', () => {
    it('チャンネル作成時に作成したユーザーがオーナーに追加される', async () => {
      const param: CreateChannelProps = {
        userId: testUserId,
        communityId: testCommunity.getCommunityId(),
        name: 'test community',
        isPrivate: false,
        slug: 'test-community',
      }

      const actual = await channelUseCase.createChannel(param)

      expect(actual.currentOwner()?.userId).toBe(param.userId)
    })
  })

  describe('updateChannel', () => {
    it('チャンネルに所属していないユーザーは更新できない', async () => {
      const createParam: CreateChannelProps = {
        userId: testUserId,
        communityId: testCommunity.getCommunityId(),
        name: 'test community2',
        isPrivate: false,
        slug: 'test-community2',
      }

      const channel = await channelUseCase.createChannel(createParam)

      const notExistsUserId = 'abcde'

      const updateParam: UpdateChannelProps = {
        id: channel.id,
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
      const createParam: CreateChannelProps = {
        userId: testUserId,
        communityId: testCommunity.getCommunityId(),
        name: 'test community3',
        isPrivate: false,
        slug: 'test-community3',
      }

      const channel = await channelUseCase.createChannel(createParam)

      const existsUserId = testUserId

      const updateParam: UpdateChannelProps = {
        id: channel.id,
        userId: existsUserId,
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
})
