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

  async getThreadDetail(id: string, userId: string): Promise<ThreadUCOutput> {
    const thread = await this.threadRepo.getById(id)
    const channel = await this.channelRepo.getChannelById(thread.channelId)
    if (!channel.getMember(userId))
      throw new Error(
        'User does not have authorization to get thread. Please join to the channel'
      )

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
    const channel = await this.channelRepo.getChannelById(thread.channelId)
    if (!channel.getMember(senderId))
      throw new Error(
        'User does not have authorization to post reply. Please join to the channel'
      )

    thread.reply({ senderId, content })

    const updatedThread = await this.threadRepo.save(thread)
    return this.mapToOutput(updatedThread)
  }

  async update({
    content,
    pinned,
    id,
    userId,
  }: UpdateMessageParam): Promise<ThreadUCOutput> {
    const message = await this.threadRepo.getById(id)
    const channel = await this.channelRepo.getChannelById(message.channelId)
    if (!channel.getMember(userId))
      throw new Error(
        'User does not have authorization to get thread. Please join to the channel'
      )

    if (userId !== message.senderId)
      throw new Error('User does not have authorization to update message.')

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
    const channel = await this.channelRepo.getChannelById(message.channelId)
    if (!channel.getMember(senderId))
      throw new Error(
        'User does not have authorization to get thread. Please join to the channel'
      )

    message.addReaction(emoji, senderId)

    const updatedMessage = await this.threadRepo.save(message)
    return this.mapToOutput(updatedMessage)
  }

  async readMessage({
    userId,
    messageId,
  }: {
    userId: string
    messageId: string
  }): Promise<ThreadUCOutput> {
    const message = await this.threadRepo.getById(messageId)

    const channel = await this.channelRepo.getChannelById(message.channelId)
    if (!channel.getMember(userId))
      throw new Error(
        'User does not have authorization to get thread. Please join to the channel'
      )

    // 既読処理
    message.addRead(userId)
    const updatedMessage = await this.threadRepo.save(message)
    return this.mapToOutput(updatedMessage)
  }

  private async mapToOutput(thread: Thread): Promise<ThreadUCOutput> {
    const channel = await this.channelRepo.getChannelById(thread.channelId)

    const replies = thread.replies?.map<ReplyUCOutput>((reply) => {
      const replier = channel.getMember(reply.senderId)
      if (!replier) throw new Error('Replier is not found in this channel')

      const replyReactions = reply.reactions?.map<ReactionUCOutPut>(
        (reaction) => {
          const sender = channel.getMember(reaction.senderId)
          if (!sender) throw new Error('Sender is not found in this channel')

          return {
            id: reaction.id || 0,
            emoji: reaction.emoji,
            sender: sender,
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
    if (!sender) throw new Error('Sender is not found in this channel')

    const threadReactions = thread.reactions?.map<ReactionUCOutPut>(
      (reaction) => {
        const sender = channel.getMember(reaction.senderId)
        if (!sender) throw new Error('Sender is not found in this channel')

        return {
          id: reaction.id || 0,
          emoji: reaction.emoji,
          sender,
        }
      }
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
