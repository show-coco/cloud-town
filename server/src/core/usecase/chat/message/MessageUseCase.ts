import IChannelRepository from '../../../adapter/repository/ChannelRepository/IChannelRepository'
import IThreadReporsitory from '../../../adapter/repository/ThreadRepository/IThreadRepository'
import ChannelMember from '../../../domain/entities/ChannelAggregate/ChannelMember'
import Thread from '../../../domain/entities/ThreadAggregate/Thread'
import {
  PostReplyParam,
  PostThreadParam,
  UpdateMessageParam,
} from './MessageUseCaseParam'

export type ReactionUCOutPut = {
  id: number
  emoji: string
  sender: ChannelMember
}

export type ReplyUCOutput = {
  id: string
  content: string
  channelId: string
  slug: string
  pinned: boolean
  sender: ChannelMember
  reactions?: ReactionUCOutPut[]
  readers?: ChannelMember[]
}

export type ThreadUCOutput = ReplyUCOutput & {
  replies?: ReplyUCOutput[]
}

export default class MessageUseCase {
  private threadRepo: IThreadReporsitory
  private channelRepo: IChannelRepository

  constructor(threadRepo: IThreadReporsitory, channelRepo: IChannelRepository) {
    this.threadRepo = threadRepo
    this.channelRepo = channelRepo
  }

  async getThreadDetail(id: string): Promise<ThreadUCOutput> {
    const thread = await this.threadRepo.getById(id)

    return this.mapToOutput(thread)
  }

  async postThread({
    senderId,
    content,
    channelId,
  }: PostThreadParam): Promise<ThreadUCOutput> {
    const channel = await this.channelRepo.getChannelById(channelId)
    const sender = channel.getMember(senderId)

    if (!sender) throw new Error('Channel member is not found')

    const newThread = Thread.create({ content, channelId, senderId })
    const thread = await this.threadRepo.save(newThread)

    return this.mapToOutput(thread)
  }

  async postReply({
    senderId,
    content,
    threadId,
  }: PostReplyParam): Promise<ThreadUCOutput> {
    const thread = await this.threadRepo.getById(threadId)
    thread.reply({ senderId, content })

    const updatedThread = await this.threadRepo.save(thread)
    return this.mapToOutput(updatedThread)
  }

  async update({
    content,
    pinned,
    id,
  }: UpdateMessageParam): Promise<ThreadUCOutput> {
    const message = await this.threadRepo.getById(id)
    if (content) message.changeContent(content)
    if (typeof pinned !== 'undefined') message.changePinned(pinned)

    const updatedMessage = await this.threadRepo.save(message)
    return this.mapToOutput(updatedMessage)
  }

  async addReaction({
    senderId,
    emoji,
    id,
  }: {
    senderId: string
    emoji: string
    id: string
  }): Promise<ThreadUCOutput> {
    const message = await this.threadRepo.getById(id)
    message.addReaction(emoji, senderId)

    const updatedMessage = await this.threadRepo.save(message)
    return this.mapToOutput(updatedMessage)
  }

  private async mapToOutput(thread: Thread): Promise<ThreadUCOutput> {
    const channel = await this.channelRepo.getChannelById(thread.channelId)

    const replies = thread.replies?.map<ReplyUCOutput>((reply) => {
      const replier = channel.getMember(reply.senderId)
      if (!replier) throw new Error('Replier is not found')

      const replyReactions = reply.reactions?.map<ReactionUCOutPut>(
        (reaction) => {
          return {
            id: reaction.id || 0,
            emoji: reaction.emoji,
            sender: channel.getMember(reaction.senderId),
          }
        }
      )

      return {
        id: reply.id,
        content: reply.content,
        channelId: reply.channelId,
        slug: reply.slug,
        pinned: reply.pinned,
        sender: replier,
        readers: reply.readers,
        reactions: replyReactions,
      }
    })

    const sender = channel.getMember(thread.senderId)
    if (!sender) throw new Error('Sender is not found')

    const threadReactions = thread.reactions?.map<ReactionUCOutPut>(
      (reaction) => ({
        id: reaction.id || 0,
        emoji: reaction.emoji,
        sender: channel.getMember(reaction.senderId),
      })
    )

    return {
      id: thread.id,
      content: thread.content,
      channelId: thread.channelId,
      slug: thread.slug,
      pinned: thread.pinned,
      replies,
      sender,
      readers: thread.readers,
      reactions: threadReactions,
    }
  }
}
