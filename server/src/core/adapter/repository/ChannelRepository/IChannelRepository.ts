import Channel from '../../../domain/entities/ChannelAggregate/Channel'

export default interface IChannelRepository {
  save(channel: Channel): Promise<Channel>
}
