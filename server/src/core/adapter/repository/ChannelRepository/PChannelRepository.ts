import { prisma } from '../../../../prisma'
import Channel from '../../../domain/entities/ChannelAggregate/Channel'
import IChannelRepository from './IChannelRepository'

export default class PChannelRepository implements IChannelRepository {
  async save(channel: Channel): Promise<Channel> {
    await prisma.channel.create({
      data: {
        name: channel.name,
        slug: channel.slug,
        is_private: channel.isPrivate,
      },
    })

    return channel
  }
}
