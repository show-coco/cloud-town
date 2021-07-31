export interface PostThread {
  senderId: string
  content: string
  channelId: string
}

export interface PostReply {
  senderId: string
  content: string
  threadId: string
}
