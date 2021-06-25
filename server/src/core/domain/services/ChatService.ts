export default class ChatService {
  static canCreateChannel(userId: number, communityId: number): boolean {
    // ユーザーがチャンネルを作成しようとしているコミュニティに属していたら作成できる
    return true
  }
}
