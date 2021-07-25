import Channel from '../../../domain/entities/ChannelAggregate/Channel'
import ChannelMember from '../../../domain/entities/ChannelAggregate/ChannelMember'

export default interface IChannelRepository {
  getChannelListByCommunityId(
    communityId: string,
    isPrivate?: boolean,
    userId?: string,
    joining?: boolean
  ): Promise<Channel[]>
  getChannelById(id: string): Promise<Channel>
  getMemberListByChannelId(id: string): Promise<ChannelMember[]>
  save(channel: Channel): Promise<Channel>
  delete(channel: Channel): Promise<void>
}
