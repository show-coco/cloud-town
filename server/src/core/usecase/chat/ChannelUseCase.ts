import IChannelRepository from '../../adapter/repository/ChannelRepository/IChannelRepository'
import Channel from '../../domain/entities/Channel'
import ChatService from '../../domain/services/ChatService'
import { CreateChannelProps } from './ChannelUseCaseProps'

export default class ChannelUseCase {
  private channelRepo: IChannelRepository

  constructor(channelRepo: IChannelRepository) {
    this.channelRepo = channelRepo
  }

  async createChannel({
    name,
    slug,
    isPrivate,
    communityId,
    userId,
  }: CreateChannelProps): Promise<Channel> {
    const canCreate = ChatService.canCreateChannel(userId, communityId)

    if (canCreate) {
      const channel = new Channel({ name, slug, isPrivate })
      const newChannel = await this.channelRepo.save(channel)

      // TODO: 作成したユーザーをチャンネル管理者に自動追加(これはドメインのロジック？だとしたら集約ルートのチャンネルに含める方が良さそう)

      return newChannel
    } else {
      throw new Error("User doesn't have authorization to create channel.")
    }
  }
}
