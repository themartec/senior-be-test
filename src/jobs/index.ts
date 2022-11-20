import '../bootstrap';
import { Queue } from 'bullmq';
import { defaultQueue } from '../queue';

export class Job {
  queue: Queue;

  constructor(queue?: Queue) {
    this.queue = defaultQueue || queue;
  }

  perform(params: Record<string, unknown>): Promise<void> {
    throw new Error('not implemented');
  };

  async create(params: Record<string, unknown>, opts?: Record<string, unknown>): Promise<void> {
    await this.queue.add(
      this.constructor.name,
      params,
      opts
    );
  }
}

// You must export all available job classes here, the name must be exactly the same as the class name
export { SendReportsJob } from './send-reports';
