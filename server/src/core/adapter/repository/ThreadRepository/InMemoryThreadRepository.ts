import Thread from '../../../domain/entities/ThreadAggregate/Thread'
import IThreadReporsitory from './IThreadRepository'

export default class InMemoryThreadRepository implements IThreadReporsitory {
  private threadList: Thread[] = []

  getById(id: string): Promise<Thread> {
    return new Promise((resolve) => {
      const thread = this.threadList.find((thread) => thread.id === id)
      if (!thread) throw new Error('Thread not found')
      resolve(thread)
    })
  }

  save(thread: Thread): Promise<Thread> {
    return new Promise((resolve) => {
      this.threadList.push(thread)
      resolve(thread)
    })
  }
}
