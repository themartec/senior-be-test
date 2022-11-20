import '../bootstrap';
import logger from '../libs/logger';
import {connection, defaultQueueName} from './index';
import {Job, Worker} from "bullmq";
import * as Jobs from "../jobs";

export const createWorker = (queueName: string) => {
  const worker = new Worker(queueName, async (job: Job) => {
    logger(`Queue: default. ID: ${job.id}. Name: ${job.name}. Params: ${JSON.stringify(job.data)}. Status: Started.`);

    const jobName = job.name;
    await (new Jobs[jobName]).perform(job.data);

    logger(`Queue: default. ID: ${job.id}. Name: ${job.name}. Params: ${JSON.stringify(job.data)}. Status: Processed.`);
  }, connection);

  worker.on('completed', (job: Job) => {
    logger(`Queue: default. ID: ${job.id}. Name: ${job.name}. Params: ${JSON.stringify(job.data)}. Status: Completed.`);
  });

  worker.on('failed', (job: Job | undefined, error: Error) => {
    if (!job) {
      return;
    }
    logger(error);
    logger(`Queue: default. ID: ${job.id}. Name: ${job.name}. Params: ${JSON.stringify(job.data)}. Status: Failed.`);
  });
}

createWorker(defaultQueueName);

logger('Worker initialized.');