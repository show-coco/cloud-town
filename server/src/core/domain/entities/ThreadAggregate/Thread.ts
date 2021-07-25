import Message, { MessageProps } from './Message'
import Reply from './Reply'

type Props = MessageProps & {
  replies: Reply[]
}

export default class Thread extends Message {
  private _replies: Reply[]

  constructor({ replies, ...props }: Props) {
    super(props)
    this._replies = replies
  }

  get replies(): Reply[] {
    return this._replies
  }
}
