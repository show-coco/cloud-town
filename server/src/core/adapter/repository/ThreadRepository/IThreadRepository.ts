import Thread from '../../../domain/entities/ThreadAggregate/Thread'

export default interface IThreadReporsitory {
  getById(id: string): Promise<Thread>
  save(thread: Thread): Promise<Thread>
}
