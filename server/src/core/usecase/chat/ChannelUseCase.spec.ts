import PChannelRepository from '../../adapter/repository/ChannelRepository/PChannelRepository'
import PUserRepository from '../../adapter/repository/UserRepository/PUserRepository'
import User from '../../domain/entities/User'
import ChannelUseCase from './ChannelUseCase'
import { CreateChannelProps, UpdateChannelProps } from './ChannelUseCaseProps'

describe('ChannelUseCase', () => {
  const channelRepo = new PChannelRepository()
  const userRepo = new PUserRepository()
  const channelUseCase = new ChannelUseCase(channelRepo)
  let user: User
  const communityId = '04756361-b592-4ade-9094-f8f1a390e4f2'

  beforeAll(async () => {
    user = await userRepo.createUser(
      'Test User',
      'google-test',
      'test@example.com'
    )
  })

  describe('createChannel', () => {
    it('チャンネル作成時に作成したユーザーがオーナーに追加される', async () => {
      const param: CreateChannelProps = {
        userId: user.getId(),
        communityId,
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
        userId: user.getId(),
        communityId,
        name: 'test community2',
        isPrivate: false,
        slug: 'test-community2',
      }

      const channel = await channelUseCase.createChannel(createParam)

      console.log(channel)

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
  })
})
