import { testCommunity } from '../../../test/test-data'
import { InMemoryCommunityRepository } from '../../adapter/repository/CommunityRepository/InMemoryCommunityRepository'
import CommunityUseCase from './CommunityUseCase'
import { CreateCommunityParam } from './CommunityUseCaseParam'

describe('CommunityUseCase', () => {
  const communityRepo = new InMemoryCommunityRepository()
  const communityUseCase = new CommunityUseCase(communityRepo)

  describe('getCommunityById', () => {
    it('コミュニティが取得できる', async () => {
      // THEN

      // DBのコミュニティの全削除
      communityRepo.clean()

      // demoデータの挿入
      const demoCommunity = await communityRepo.createCommunity(testCommunity)

      // WHEN
      const actual = await communityUseCase.getCommunityById(
        demoCommunity.getCommunityId()
      )

      // THEN
      expect(actual).not.toBeNull()
      if (actual === null) {
        return
      }

      expect(actual.getName()).toBe(testCommunity.getName())
      expect(actual.getSlug()).toBe(testCommunity.getSlug())
      expect(actual.getIntroduction()).toBe(testCommunity.getIntroduction())
    })
  })

  describe('createCommunity', () => {
    it('コミュニティが作成できる。', async () => {
      // GIVEN
      const param: CreateCommunityParam = {
        name: '山田太郎',
        slug: 'abcdef',
        introduction: '<p>Hello</p>',
      }

      // WHEN
      const actual = await communityUseCase.createCommunity(param)

      // THEN
      expect(actual.getName()).toBe(param.name)
      expect(actual.getSlug()).toBe(param.slug)
      expect(actual.getIntroduction()).toBe(param.introduction)
    })
  })
})
