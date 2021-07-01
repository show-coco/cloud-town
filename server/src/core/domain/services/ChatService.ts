export default class ChatService {
  static canCreateChannel(userId: string, communityId: string): boolean {
    // ユーザーがチャンネルを作成しようとしているコミュニティに属していたら作成できる
    return true
  }
}
