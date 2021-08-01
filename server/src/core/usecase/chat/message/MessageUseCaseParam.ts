export interface PostThreadParam {
  senderId: string
  content: string
  channelId: string
}

export interface PostReplyParam {
  senderId: string
  content: string
  threadId: string
}

export interface UpdateMessageParam {
  id: string
  content?: string
  pinned?: boolean
  userId: string
}
