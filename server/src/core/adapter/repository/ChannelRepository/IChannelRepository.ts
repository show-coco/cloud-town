import Channel from '../../../domain/entities/ChannelAggregate/Channel'
import User from '../../../domain/entities/User'

export default interface IChannelRepository {
  getChannelListByCommunityId(communityId: string): Promise<Channel[]>
  getChannelById(id: string): Promise<Channel>
  getMemberListByChannelId(id: string): Promise<User[]>
  save(channel: Channel): Promise<Channel>
  delete(channel: Channel): Promise<void>
}
