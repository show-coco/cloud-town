import { prisma } from '../../../../prisma'
import {
  Channel as PChannel,
  ChannelMember as PChannelMember,
} from '@prisma/client'
import Channel from '../../../domain/entities/ChannelAggregate/Channel'
import IChannelRepository from './IChannelRepository'
import ChannelMember from '../../../domain/entities/ChannelAggregate/ChannelMember'

export default class PChannelRepository implements IChannelRepository {
  async getChannelById(id: string): Promise<Channel> {
    const channel = await prisma.channel.findFirst({
      where: { id },
      include: { ChannelMember: true },
    })

    if (!channel) {
      throw new Error(`Channel which id is ${id} does't exists.`)
    }

    return this.converter(channel)
  }

  async save(channel: Channel): Promise<Channel> {
    await prisma.channel.create({
      data: {
        id: channel.id,
        name: channel.name,
        slug: channel.slug,
        is_private: channel.isPrivate,
        ChannelMember: {
          createMany: {
            data: channel.channelMembers.map((member) => ({
              id: member.id,
              user_id: member.userId,
              role: member.role,
            })),
          },
        },
      },
    })

    return channel
  }

  private converter(
    channel: PChannel & {
      ChannelMember: PChannelMember[]
    }
  ): Channel {
    const channelMembers = channel.ChannelMember.map(
      (member) =>
        new ChannelMember({
          ...member,
          userId: member.user_id,
          channelId: member.channel_id,
        })
    )

    return new Channel({
      id: channel.id,
      name: channel.name,
      slug: channel.slug,
      isPrivate: channel.is_private,
      channelMember: channelMembers,
    })
  }
}
