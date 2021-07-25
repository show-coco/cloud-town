import Thread from '../../../domain/entities/ThreadAggregate/Thread'
import IThreadReporsitory from './IThreadRepository'

export default class InMemoryThreadRepository implements IThreadReporsitory {
  private threadList: Thread[] = []

  save(thread: Thread): Promise<Thread> {
    return new Promise((resolve) => {
      this.threadList.push(thread)
      resolve(thread)
    })
  }
}
