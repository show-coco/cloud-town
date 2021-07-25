import Message, {
  MessageConstructorProps,
  MessageCreateProps,
  MessageRegenerateProps,
} from './Message'
import Reply from './Reply'

type ConstructorProps = MessageConstructorProps & {
  replies?: Reply[]
}

type CreateProps = MessageCreateProps

type RegenerateProps = MessageRegenerateProps & {
  replies: Reply[]
}

export default class Thread extends Message {
  private _replies?: Reply[]

  private constructor({ replies, ...props }: ConstructorProps) {
    super(props)
    this._replies = replies
  }

  static create(props: CreateProps): Thread {
    const message = super.create(props)
    return new Thread({
      id: message.id,
      content: message.content,
      slug: message.slug,
      pinned: message.pinned,
      senderId: message.senderId,
      readers: message.readers,
      channelId: message.channelId,
    })
  }

  static regenerate(props: RegenerateProps): Thread {
    return new Thread(props)
  }

  get replies(): Reply[] | undefined {
    return this._replies
  }
}
