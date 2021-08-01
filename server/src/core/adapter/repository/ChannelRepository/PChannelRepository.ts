import prisma from '../../../../prisma'
import {
  Channel as PChannel,
  ChannelMember as PChannelMember,
  ChannelRole,
  User as PUser,
} from '@prisma/client'
import Channel from '../../../domain/entities/ChannelAggregate/Channel'
import IChannelRepository from './IChannelRepository'
import ChannelMember from '../../../domain/entities/ChannelAggregate/ChannelMember'

type ExtendedChannel =
  | PChannel & {
      ChannelMember: (PChannelMember & {
        user: PUser
      })[]
    }

export default class PChannelRepository implements IChannelRepository {
  async getChannelListByCommunityId(
    communityId: string,
    isPrivate?: boolean,
    userId?: string,
    joining?: boolean
  ): Promise<Channel[]> {
    const result = await prisma.channel.findMany({
      where: {
        community_id: communityId,
        is_private: isPrivate,
        deleted_at: null,
      },
      include: {
        ChannelMember: {
          include: {
            user: true,
          },
          where: {
            NOT: {
              role: ChannelRole.Leaved,
            },
          },
        },
      },
    })

    let channelList = result.map((channel) => this.converter(channel))

    // ユーザーが不参加のチャンネルリストを抽出
    if (joining === false) {
      channelList = channelList.filter((channel) => {
        // チャンネルにユーザーがいない
        const notExists =
          channel.channelMembers.findIndex((member) => member.id === userId) ===
          -1

        if (notExists) return true

        // チャンネルから既に退会している
        const leaved =
          channel.channelMembers.findIndex(
            (member) =>
              member.id === userId && member.role === ChannelRole.Leaved
          ) !== -1

        if (leaved) return true
        return false
      })
    }

    // ユーザーが参加中のチャンネルリストを抽出
    if (joining) {
      channelList = channelList.filter((channel) => {
        const exists =
          channel.channelMembers.findIndex(
            (member) =>
              member.id === userId && member.role !== ChannelRole.Leaved
          ) !== -1

        return exists
      })
    }

    return channelList
  }

  async getChannelById(id: string): Promise<Channel> {
    const channel = await prisma.channel.findFirst({
      where: { id, deleted_at: null },
      include: {
        ChannelMember: {
          include: {
            user: true,
          },
          where: {
            NOT: {
              role: ChannelRole.Leaved,
            },
          },
        },
      },
    })

    if (!channel) {
      throw new Error(`Channel not found`)
    }

    return this.converter(channel)
  }

  async getMemberListByChannelId(id: string): Promise<ChannelMember[]> {
    const channel = await prisma.channel.findFirst({
      where: {
        id,
      },
      include: {
        ChannelMember: {
          include: {
            user: true,
          },
          where: {
            NOT: {
              role: ChannelRole.Leaved,
            },
          },
        },
      },
    })

    if (!channel) throw new Error('Channel not found')

    const userList: ChannelMember[] = channel.ChannelMember.map<ChannelMember>(
      (member) =>
        new ChannelMember({
          ...member.user,
          googleId: member.user.google_id,
          role: member.role,
          memberId: member.id,
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
                user_id: member.id,
                role: member.role,
              })),
            },
          },
        },
        include: {
          ChannelMember: {
            include: {
              user: true,
            },
            where: {
              NOT: {
                role: ChannelRole.Leaved,
              },
            },
          },
        },
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
        include: {
          ChannelMember: {
            include: {
              user: true,
            },
            where: {
              NOT: {
                role: ChannelRole.Leaved,
              },
            },
          },
        },
      })

      // MEMO: upsertManyがまだ使用できないため繰り返しupsertを実行 (issue: https://github.com/prisma/prisma/issues/4134)
      const channelMembers = await Promise.all(
        channel.channelMembers.map(async (member) => {
          const updatedChannelMember = await prisma.channelMember.upsert({
            create: {
              channel_id: channel.id,
              user_id: member.id,
              role: member.role,
            },
            update: {
              channel_id: channel.id,
              role: member.role,
            },
            where: {
              id: member.memberId || 0, // MEMO: issue(https://github.com/prisma/prisma/issues/5233)
            },
            include: {
              user: true,
            },
          })

          return updatedChannelMember
        })
      )

      updatedChannel.ChannelMember = channelMembers

      return this.converter(updatedChannel)
    }
  }

  async delete(channel: Channel): Promise<void> {
    await prisma.channel.update({
      data: {
        deleted_at: channel.deletedAt,
      },
      where: {
        id: channel.id,
      },
    })
  }

  private converter(channel: ExtendedChannel): Channel {
    const channelMembers = channel.ChannelMember.map(
      (member) =>
        new ChannelMember({
          ...member.user,
          googleId: member.user.google_id,
          memberId: member.id,
          role: member.role,
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
