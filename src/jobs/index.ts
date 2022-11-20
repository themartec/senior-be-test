import '../bootstrap';
import { Queue } from 'bullmq';
import { defaultQueue } from '../queue';
import logger from "../libs/logger";

export abstract class Job {
  queue: Queue;

  constructor(queue?: Queue) {
    this.queue = defaultQueue || queue;
  }

  abstract perform(params: Record<string, unknown>): Promise<void>;

  async create(params: Record<string, unknown>, opts?: Record<string, unknown>): Promise<void> {
    await this.queue.add(
      this.constructor.name,
      params,
      opts
    );
    logger(`Queue: ${this.queue.name}. Name: ${this.constructor.name}. Params: ${JSON.stringify(params)}. Status: Added.`);
  }
}

// You must export all available job classes here, the name must be exactly the same as the class name
export { default as SendReportsJob } from './send-reports';
