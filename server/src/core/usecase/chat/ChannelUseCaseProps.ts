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
