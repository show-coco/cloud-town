import Channel from '../../../domain/entities/Channel'

export default interface IChannelRepository {
  save(channel: Channel): Promise<Channel>
}
