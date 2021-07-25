import IChannelRepository from '../../../adapter/repository/ChannelRepository/IChannelRepository'
import IThreadReporsitory from '../../../adapter/repository/ThreadRepository/IThreadRepository'
import ChannelMember from '../../../domain/entities/ChannelAggregate/ChannelMember'
import Reply from '../../../domain/entities/ThreadAggregate/Reply'
import Thread from '../../../domain/entities/ThreadAggregate/Thread'

type ReplyModel = {
  id: string
  content: string
  channelId: string
  slug: string
  pinned: boolean
  sender: ChannelMember
  readers?: ChannelMember[]
}

export type ThreadModel = {
  id: string
  content: string
  channelId: string
  slug: string
  pinned: boolean
  sender: ChannelMember
  replies?: ReplyModel[]
  readers?: ChannelMember[]
}

export default class MessageUseCase {
  private threadRepo: IThreadReporsitory
  private channelRepo: IChannelRepository

  constructor(threadRepo: IThreadReporsitory, channelRepo: IChannelRepository) {
    this.threadRepo = threadRepo
    this.channelRepo = channelRepo
  }

  async postThread({
    senderId,
    content,
    channelId,
  }: {
    senderId: string
    content: string
    channelId: string
  }): Promise<ThreadModel> {
    const channel = await this.channelRepo.getChannelById(channelId)
    const sender = channel.getMember(senderId)

    if (!sender) throw new Error('Channel member is not found')

    const newThread = Thread.create({ content, channelId, senderId })
    const thread = await this.threadRepo.save(newThread)

    const replies = thread.replies?.map<ReplyModel>((reply) => {
      const replier = channel.getMember(reply.id)
      if (!replier) throw new Error('Channel member is not found')
      return {
        id: thread.id,
        content: thread.content,
        channelId: thread.channelId,
        slug: thread.slug,
        pinned: thread.pinned,
        sender: replier,
        readers: thread.readers,
      }
    })

    return {
      id: thread.id,
      content: thread.content,
      channelId: thread.channelId,
      slug: thread.slug,
      pinned: thread.pinned,
      replies,
      sender,
      readers: thread.readers,
    }
  }
}
