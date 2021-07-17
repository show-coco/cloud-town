import Channel from '../../../domain/entities/ChannelAggregate/Channel'
import User from '../../../domain/entities/User'
import IChannelRepository from './IChannelRepository'

export class InMemoryChannelRepository implements IChannelRepository {
  private channels: Channel[] = []

  getChannelListByCommunityId(communityId: string): Promise<Channel[]> {
    return new Promise((resolve) => {
      const channelList = this.channels.filter(
        (channel) => channel.communityId === communityId
      )
      resolve(channelList)
    })
  }

  getChannelById(id: string): Promise<Channel> {
    return new Promise((resolve) => {
      const channel = this.channels.find((channel) => channel.id === id)
      if (channel) resolve(channel)
    })
  }

  getMemberListByChannelId(id: string): Promise<User[]> {
    return new Promise((resolve) => {
      this.channels.find((channel) => {
        return channel.id === id
      })
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
