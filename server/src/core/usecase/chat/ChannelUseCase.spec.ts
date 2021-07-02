import { v4 } from 'uuid'
import PChannelRepository from '../../adapter/repository/ChannelRepository/PChannelRepository'
import ChannelUseCase from './ChannelUseCase'
import { CreateChannelProps } from './ChannelUseCaseProps'

describe('ChannelUseCase', () => {
  let channelUseCase: ChannelUseCase

  beforeEach(() => {
    channelUseCase = new ChannelUseCase(new PChannelRepository())
  })

  describe('createChannel', () => {
    it('チャンネル作成時に作成したユーザーがオーナーに追加される', async () => {
      const param: CreateChannelProps = {
        userId: v4(),
        communityId: v4(),
        name: 'test community',
        isPrivate: false,
        slug: 'test-community',
      }

      const actual = await channelUseCase.createChannel(param)

      expect(actual.currentOwner()?.userId).toBe(param.userId)
    })
  })
})
