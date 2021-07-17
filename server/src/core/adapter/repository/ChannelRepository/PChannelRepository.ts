import prisma from '../../../../prisma'
import {
  Channel as PChannel,
  ChannelMember as PChannelMember,
} from '@prisma/client'
import Channel from '../../../domain/entities/ChannelAggregate/Channel'
import IChannelRepository from './IChannelRepository'
import ChannelMember from '../../../domain/entities/ChannelAggregate/ChannelMember'
import User from '../../../domain/entities/User'

export default class PChannelRepository implements IChannelRepository {
  async getChannelListByCommunityId(communityId: string): Promise<Channel[]> {
    const result = await prisma.channel.findMany({
      where: {
        community_id: communityId,
      },
      include: { ChannelMember: true },
    })

    const cChannelList = result.map((channel) => this.converter(channel))

    return cChannelList
  }

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

  async getMemberListByChannelId(id: string): Promise<User[]> {
    const channel = await prisma.channel.findFirst({
      where: {
        id,
      },
      include: {
        ChannelMember: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!channel) throw new Error('Channel not found')

    const userList: User[] = channel.ChannelMember.map<User>(
      (member) =>
        new User({
          ...member.user,
          googleId: member.user.google_id,
        })
    )
    return userList
  }

  async save(channel: Channel): Promise<Channel> {
    const exists = await prisma.channel.findFirst({ where: { id: channel.id } })

    if (!exists) {
      const created = await prisma.channel.create({
        data: {
          id: channel.id,
          name: channel.name,
          slug: channel.slug,
          is_private: channel.isPrivate,
          community_id: channel.communityId,
          ChannelMember: {
            createMany: {
              data: channel.channelMembers?.map((member) => ({
                id: member.id,
                user_id: member.userId,
                role: member.role,
              })),
            },
          },
        },
        include: { ChannelMember: true },
      })

      return this.converter(created)
    } else {
      const updatedChannel = await prisma.channel.update({
        data: {
          name: channel.name,
          slug: channel.slug,
          is_private: channel.isPrivate,
        },
        where: {
          id: channel.id,
        },
        include: { ChannelMember: true },
      })

      // MEMO: upsertManyがまだ使用できないため繰り返しupsertを実行 (issue: https://github.com/prisma/prisma/issues/4134)
      const channelMembers = await Promise.all(
        channel.channelMembers.map(async (member) => {
          const updatedChannelMember = await prisma.channelMember.upsert({
            create: {
              user_id: member.userId,
              channel_id: member.channelId,
              role: member.role,
            },
            update: {
              channel_id: member.channelId,
              role: member.role,
            },
            where: {
              id: member.id,
            },
          })

          return updatedChannelMember
        })
      )

      updatedChannel.ChannelMember = channelMembers

      return this.converter(updatedChannel)
    }
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
      communityId: channel.community_id,
    })
  }
}
