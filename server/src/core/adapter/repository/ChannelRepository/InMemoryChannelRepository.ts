import Channel from '../../../domain/entities/ChannelAggregate/Channel'
import IChannelRepository from './IChannelRepository'

export class InMemoryChannelRepository implements IChannelRepository {
  private channels: Channel[] = []

  getChannelById(id: string): Promise<Channel> {
    return new Promise((resolve) => {
      const channel = this.channels.find((channel) => channel.id === id)
      if (channel) resolve(channel)
    })
  }
  save(channel: Channel): Promise<Channel> {
    return new Promise((resolve) => {
      this.channels.push(channel)
      resolve(channel)
    })
  }

  clean(): void {
    this.channels = []
  }
}
