import Channel from '../../../domain/entities/ChannelAggregate/Channel'

export default interface IChannelRepository {
  getChannelById(id: string): Promise<Channel>
  save(channel: Channel): Promise<Channel>
}
