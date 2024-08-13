import { init } from '../bootstrap';
import logger from '../libs/logger';
import { connection, defaultQueueName } from './index';
import { Job, Worker } from 'bullmq';
import * as Jobs from '../jobs';

const createWorker = (queueName: string) => {
  const worker = new Worker(queueName, async (job: Job) => {
    logger(`Queue: default. ID: ${job.id}. Name: ${job.name}. Params: ${JSON.stringify(job.data)}. Status: Started.`);

    const jobName = job.name;

    const classObject = (Jobs as { [key: string]: typeof Jobs.Job })[jobName]

    await (new classObject).perform(job.data);
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
};

init()
  .then(() => {
    createWorker(defaultQueueName);
    logger('Worker initialized.');
  });
