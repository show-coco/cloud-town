import Thread from '../../../domain/entities/ThreadAggregate/Thread'

export default interface IThreadReporsitory {
  save(thread: Thread): Promise<Thread>
}
