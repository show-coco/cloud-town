export interface GetChannelList {
  communityId: string
  joining?: boolean
  userId?: string
  isPrivate?: boolean
}

export interface CreateChannelProps {
  name: string
  slug: string
  isPrivate: boolean
  communityId: string
  userId: string
}

export interface UpdateChannelProps {
  id: string
  name?: string
  slug?: string
  isPrivate?: boolean
  userId: string
}

export interface ChangeOwnerProps {
  id: string
  currentOwnerId: string
  nextOwnerId: string
}

export interface DeleteChannelParam {
  id: string
  userId: string
}

export interface LeaveChannelParam {
  id: string
  userId: string
  nextOwnerId?: string
}

export interface JoinChannelParam {
  id: string
  userId: string
}

export interface KickMemberParam {
  id: string
  userId: string
  memberId: string
}

export interface AddMembersParam {
  id: string
  userId: string
  memberIds: string[]
}
