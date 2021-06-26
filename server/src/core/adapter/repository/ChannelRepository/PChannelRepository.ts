import { prisma } from '../../../../prisma'
import Channel from '../../../domain/entities/Channel'
import IChannelRepository from './IChannelRepository'

export default class PChannelRepository implements IChannelRepository {
  async save(channel: Channel): Promise<Channel> {
    await prisma.channel.create({
      data: {
        name: channel.getName(),
        slug: channel.getSlug(),
        is_private: channel.getIsPrivate(),
      },
    })

    return channel
  }
}
