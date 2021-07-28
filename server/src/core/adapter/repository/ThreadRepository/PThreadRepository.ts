import { Message as PMessage } from '@prisma/client'
import prisma from '../../../../prisma'
import Reply from '../../../domain/entities/ThreadAggregate/Reply'
import Thread from '../../../domain/entities/ThreadAggregate/Thread'
import IThreadReporsitory from './IThreadRepository'

type MessageModel = PMessage & {
  Message: PMessage[]
}

export default class PThreadRepository implements IThreadReporsitory {
  async getById(id: string): Promise<Thread> {
    const pMessage = await prisma.message.findFirst({
      where: {
        id,
      },
      include: {
        Message: true,
      },
    })

    if (!pMessage) throw new Error('Thread not found')

    return this.converter(pMessage)
  }

  async save(thread: Thread): Promise<Thread> {
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
        Message: true,
      },
    })

    return this.converter(pMessage)
  }

  converter(pMessage: MessageModel): Thread {
    return Thread.regenerate({
      ...pMessage,
      channelId: pMessage.channel_id,
      senderId: pMessage.user_id,
      replies: pMessage.Message.map((reply) =>
        Reply.regenerate({
          ...reply,
          channelId: pMessage.channel_id,
          senderId: reply.user_id,
        })
      ),
    })
  }
}
