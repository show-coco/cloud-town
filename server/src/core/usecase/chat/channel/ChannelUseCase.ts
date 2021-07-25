import IChannelRepository from '../../../adapter/repository/ChannelRepository/IChannelRepository'
import IUserRepository from '../../../adapter/repository/UserRepository/IUserRepository'
import Channel from '../../../domain/entities/ChannelAggregate/Channel'
import ChannelMember from '../../../domain/entities/ChannelAggregate/ChannelMember'
import ChatService from '../../../domain/services/ChatService'
import {
  AddMembersParam,
  ChangeOwnerProps,
  CreateChannelProps,
  DeleteChannelParam,
  GetChannelList,
  JoinChannelParam,
  KickMemberParam,
  LeaveChannelParam,
  UpdateChannelProps,
} from './ChannelUseCaseParam'

export default class ChannelUseCase {
  private channelRepo: IChannelRepository
  private userRepo: IUserRepository

  constructor(channelRepo: IChannelRepository, userRepo: IUserRepository) {
    this.channelRepo = channelRepo
    this.userRepo = userRepo
  }

  async getChannelDetailsById(channelId: string): Promise<Channel> {
    const channel = await this.channelRepo.getChannelById(channelId)

    return channel
  }

  async getChannelList({
    communityId,
    isPrivate,
    userId,
    joining,
  }: GetChannelList): Promise<Channel[]> {
    const channelList = await this.channelRepo.getChannelListByCommunityId(
      communityId,
      isPrivate,
      userId,
      joining
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
    const user = await this.userRepo.getUserById(userId)

    if (!canCreate) {
      throw new Error("User doesn't have authorization to create channel.")
    }

    const channel = new Channel({ name, slug, isPrivate, communityId })
    channel.addOwner(user)

    const newChannel = await this.channelRepo.save(channel)

    return newChannel
  }

  async getMemberList(id: string): Promise<ChannelMember[]> {
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

  async joinChannel({ id, userId }: JoinChannelParam): Promise<Channel> {
    const channel = await this.channelRepo.getChannelById(id)
    const user = await this.userRepo.getUserById(userId)

    channel.join(user)

    return this.channelRepo.save(channel)
  }

  async kickMember({
    id,
    userId,
    memberId,
  }: KickMemberParam): Promise<Channel> {
    const channel = await this.channelRepo.getChannelById(id)

    channel.kickMember(userId, memberId)
    return this.channelRepo.save(channel)
  }

  async addMembers({
    id,
    userId,
    memberIds,
  }: AddMembersParam): Promise<Channel> {
    const channel = await this.channelRepo.getChannelById(id)
    const users = await this.userRepo.getUsersByIds(memberIds)

    channel.addMembers(userId, users)
    return this.channelRepo.save(channel)
  }
}
