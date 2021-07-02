import IChannelRepository from '../../adapter/repository/ChannelRepository/IChannelRepository'
import Channel from '../../domain/entities/ChannelAggregate/Channel'
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

    if (!canCreate) {
      throw new Error("User doesn't have authorization to create channel.")
    }

    const channel = new Channel({ name, slug, isPrivate })
    channel.addOwner(userId)

    const newChannel = await this.channelRepo.save(channel)

    return newChannel
  }
}
