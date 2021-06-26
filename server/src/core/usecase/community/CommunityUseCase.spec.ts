import { prisma } from '../../../prisma'
import PCommunityRepository from '../../adapter/repository/CommunityRepository/PCommunityRepository'
import CommunityUseCase from './CommunityUseCase'
import { CreateCommunityParam } from './CommunityUseCaseParam'

describe('CommunityUseCase', () => {
  let communityUseCase: CommunityUseCase

  beforeEach(() => {
    communityUseCase = new CommunityUseCase(new PCommunityRepository())
  })

  describe('getCommunityById', () => {
    it('コミュニティが取得できる', async () => {
      // THEN

      // DBのコミュニティの全削除
      await prisma.community.deleteMany({})
      // DBが全削除できているか
      expect(await prisma.community.findMany()).toHaveLength(0)

      // demoデータの挿入
      const demoCommunity: Parameters<typeof prisma.community.create> = [
        {
          data: {
            name: '山田太郎',
            slug: 'abcdef',
            introduction: '<p>Hello</p>',
          },
        },
      ]
      const pDemoCommunity = await prisma.community.create(demoCommunity[0])

      // WHEN
      const actual = await communityUseCase.getCommunityById(pDemoCommunity.id)

      // THEN
      expect(actual).not.toBeNull()
      if (actual === null) {
        return
      }

      expect(actual.getName()).toBe(demoCommunity[0].data.name)
      expect(actual.getSlug()).toBe(demoCommunity[0].data.slug)
      expect(actual.getIntroduction()).toBe(demoCommunity[0].data.introduction)
    })

    it('コミュニティが登録されていないとき、nullである', async () => {
      // THEN

      // DBのコミュニティの全削除
      await prisma.community.deleteMany({})
      // DBが全削除できているか
      expect(await prisma.community.findMany()).toHaveLength(0)

      // WHEN
      const actual = await communityUseCase.getCommunityById(1)

      // THEN
      expect(actual).toBeNull()
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
