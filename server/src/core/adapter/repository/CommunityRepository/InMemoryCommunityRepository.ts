import Community from '../../../domain/entities/CommunityAggregate/Community'
import ICommunityRepository from './ICommunityRepository'

export class InMemoryCommunityRepository implements ICommunityRepository {
  private communities: Community[] = []

  getCommunityById(id: string): Promise<Community | null> {
    return new Promise((resolve) => {
      const community = this.communities.find(
        (community) => community.getCommunityId() === id
      )
      if (community) resolve(community)
    })
  }
  createCommunity(arg: Community): Promise<Community> {
    return new Promise((resolve) => {
      this.communities.push(arg)
      resolve(arg)
    })
  }

  clean(): void {
    this.communities = []
  }
}
