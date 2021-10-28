import {
  Message as PMessage,
  Reaction as PReaction,
  Read as PRead,
} from '@prisma/client'
import prisma from '../../../../prisma'
import Reaction from '../../../domain/entities/ThreadAggregate/Reaction'
import Read from '../../../domain/entities/ThreadAggregate/Read'
import Reply from '../../../domain/entities/ThreadAggregate/Reply'
import Thread from '../../../domain/entities/ThreadAggregate/Thread'
import IThreadReporsitory from './IThreadRepository'

type MessageModel =
  | PMessage & {
    Message: (PMessage & {
      reactions: PReaction[]
      reads: PRead[]
    })[]
    reads: PRead[]
    reactions: PReaction[]
  }

export default class PThreadRepository implements IThreadReporsitory {
  async getById(id: string): Promise<Thread> {
    const pMessage = await prisma.message.findFirst({
      where: {
        id,
      },
      include: {
        Message: {
          include: {
            reactions: true,
            reads: true,
          },
        },
        reactions: true,
        reads: true,
      },
    })

    if (!pMessage) throw new Error('Thread not found')

    return this.converter(pMessage)
  }

  async save(thread: Thread): Promise<Thread> {
    const exists = await prisma.message.findFirst({
      where: {
        id: thread.id,
      },
    })

    if (exists) {
      const pMessage = await prisma.message.update({
        data: {
          id: thread.id,
          content: thread.content,
          slug: thread.slug,
          user_id: thread.senderId,
          pinned: thread.pinned,
          channel_id: thread.channelId,
        },
        where: {
          id: thread.id,
        },
        include: {
          Message: {
            include: {
              reactions: true,
              reads: true,
            },
          },
          reactions: true,
          reads: true,
        },
      })

      if (thread.replies) {
        // MEMO: upsertManyがまだ使用できないため繰り返しupsertを実行 (issue: https://github.com/prisma/prisma/issues/4134)
        const replies = await Promise.all(
          thread.replies.map(async (reply) => {
            const updatedReply = await prisma.message.upsert({
              create: {
                id: reply.id,
                content: reply.content,
                slug: reply.slug,
                user_id: reply.senderId,
                pinned: reply.pinned,
                channel_id: reply.channelId,
                parent_message_id: thread.id,
              },
              update: {
                content: reply.content,
                slug: reply.slug,
                pinned: reply.pinned,
              },
              where: {
                id: reply.id,
              },
              include: {
                reactions: true,
                reads: true,
              },
            })

            if (reply.reactions) {
              const reactions = await Promise.all(
                reply.reactions.map(async (reaction) => {
                  const updatedReaction = await prisma.reaction.upsert({
                    create: {
                      emoji: reaction.emoji,
                      user_id: reaction.senderId,
                      message_id: thread.id,
                    },
                    update: {
                      emoji: reaction.emoji,
                    },
                    where: {
                      id: reaction.id || 0,
                    },
                  })

                  return updatedReaction
                })
              )

              updatedReply.reactions = reactions
            }

            if (reply.reads) {
              const reads = await Promise.all(
                reply.reads.map(async (read) => {
                  const updatedReaction = await prisma.read.upsert({
                    create: {
                      user_id: read.userId,
                      message_id: read.messageId,
                      created_at: read.createdAt,
                      updated_at: read.updatedAt,
                    },
                    update: {
                      created_at: read.createdAt,
                      updated_at: read.updatedAt,
                    },
                    where: {
                      id: thread.id,
                    },
                  })

                  return updatedReaction
                })
              )
              updatedReply.reads = reads
            }

            return updatedReply
          })
        )

        pMessage.Message = replies
      }

      if (thread.reactions) {
        const reactions = await Promise.all(
          thread.reactions.map(async (reaction) => {
            const updatedReaction = await prisma.reaction.upsert({
              create: {
                emoji: reaction.emoji,
                user_id: reaction.senderId,
                message_id: thread.id,
              },
              update: {
                emoji: reaction.emoji,
              },
              where: {
                id: reaction.id || 0,
              },
            })

            return updatedReaction
          })
        )

        pMessage.reactions = reactions
      }

      if (thread.reads) {
        const reads = await Promise.all(
          thread.reads.map(async (read) => {
            const updatedReaction = await prisma.read.upsert({
              create: {
                user_id: read.userId,
                message_id: read.messageId,
                created_at: read.createdAt,
                updated_at: read.updatedAt,
              },
              update: {
                created_at: read.createdAt,
                updated_at: read.updatedAt,
              },
              where: {
                id: thread.id,
              },
            })

            return updatedReaction
          })
        )
        pMessage.reads = reads
      }

      return this.converter(pMessage)
    } else {
      const pMessage = await prisma.message.create({
        data: {
          id: thread.id,
          content: thread.content,
          slug: thread.slug,
          user_id: thread.senderId,
          pinned: thread.pinned,
          channel_id: thread.channelId,
        },
        include: {
          Message: {
            include: {
              reactions: true,
              reads: true,
            },
          },
          reactions: true,
          reads: true,
        },
      })

      return this.converter(pMessage)
    }
  }

  private converter(pMessage: MessageModel): Thread {
    return Thread.regenerate({
      ...pMessage,
      channelId: pMessage.channel_id,
      senderId: pMessage.user_id,
      reactions: pMessage.reactions.map(
        (reaction) => new Reaction({ ...reaction, senderId: reaction.user_id })
      ),
      reads: pMessage.reads.map(
        (read) =>
          new Read({
            id: read.id,
            userId: read.user_id,
            messageId: read.message_id,
            createdAt: read.created_at,
            updatedAt: read.updated_at,
          })
      ),
      replies: pMessage.Message.map((reply) =>
        Reply.regenerate({
          ...reply,
          channelId: pMessage.channel_id,
          senderId: reply.user_id,
          reactions: reply.reactions.map(
            (reaction) =>
              new Reaction({ ...reaction, senderId: reaction.user_id })
          ),
          reads: reply.reads.map(
            (read) =>
              new Read({
                id: read.id,
                userId: read.user_id,
                messageId: read.message_id,
                createdAt: read.created_at,
                updatedAt: read.updated_at,
              })
          ),
        })
      ),
    })
  }
}
