import IChannelRepository from '../../adapter/repository/ChannelRepository/IChannelRepository'
import Channel from '../../domain/entities/ChannelAggregate/Channel'
import User from '../../domain/entities/User'
import ChatService from '../../domain/services/ChatService'
import {
  ChangeOwnerProps,
  CreateChannelProps,
  DeleteChannelParam,
  LeaveChannelParam,
  UpdateChannelProps,
} from './ChannelUseCaseParam'

export default class ChannelUseCase {
  private channelRepo: IChannelRepository

  constructor(channelRepo: IChannelRepository) {
    this.channelRepo = channelRepo
  }

  async getChannelList(communityId: string): Promise<Channel[]> {
    const channelList = await this.channelRepo.getChannelListByCommunityId(
      communityId
    )

    return channelList
  }

  async createChannel({
    name,
    slug,
    isPrivate,
    communityId,
    userId,
  }: CreateChannelProps): Promise<Channel> {
    const canCreate = ChatService.canCreateChannel(userId, communityId)

    if (!canCreate) {
      throw new Error("User doesn't have authorization to create channel.")
    }

    const channel = new Channel({ name, slug, isPrivate, communityId })
    channel.addOwner(userId)

    const newChannel = await this.channelRepo.save(channel)

    return newChannel
  }

  async getMemberList(id: string): Promise<User[]> {
    return await this.channelRepo.getMemberListByChannelId(id)
  }

  async updateChannel({
    id,
    name,
    isPrivate,
    slug,
    userId,
  }: UpdateChannelProps): Promise<Channel> {
    const channel = await this.channelRepo.getChannelById(id)

    const userIsExists = channel.existsInChannel(userId)
    if (!userIsExists) throw new Error("User doesn't exists in this channel")

    if (name) channel.changeName(name)
    if (isPrivate) channel.changeIsPrivate(isPrivate)
    if (slug) channel.changeSlug(slug)

    const updatedChannel = await this.channelRepo.save(channel)

    return updatedChannel
  }

  async changeOwner({
    id,
    currentOwnerId,
    nextOwnerId,
  }: ChangeOwnerProps): Promise<Channel> {
    const channel = await this.channelRepo.getChannelById(id)

    channel.changeOwner(currentOwnerId, nextOwnerId)

    const updatedChannel = await this.channelRepo.save(channel)
    return updatedChannel
  }

  async deleteChannel({ id, userId }: DeleteChannelParam): Promise<void> {
    const channel = await this.channelRepo.getChannelById(id)
    channel.delete(userId)

    await this.channelRepo.delete(channel)
  }

  async leaveChannel({
    id,
    userId,
    nextOwnerId,
  }: LeaveChannelParam): Promise<void> {
    const channel = await this.channelRepo.getChannelById(id)
    channel.leave(userId, nextOwnerId)

    await this.channelRepo.save(channel)
  }
}
