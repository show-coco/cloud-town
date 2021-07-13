import Community from '../core/domain/entities/Community'

export const testCommunity: Community = new Community({
  id: '3d109f8e-3248-419e-b125-284638dce331',
  name: 'test community',
  slug: 'test-community',
  introduction: 'description',
  createdAt: new Date(),
  updatedAt: new Date(),
})
