import { Queue as QueueMQ } from 'bullmq';
import * as express from "express";
import {
  ExpressAdapter,
  createBullBoard,
  BullMQAdapter,
} from '@bull-board/express';
import queueConfig from "../config/queue.config";

const createQueueMQ = (name: string) => new QueueMQ(name, { connection: queueConfig.connection });

const run = async () => {
  const app = express();

  const mergevideoBullMq = createQueueMQ('merge-video-job');
  const watermarkBullMq = createQueueMQ('watermark-job');

  const serverAdapter: any = new ExpressAdapter();
  serverAdapter.setBasePath('/ui');

  createBullBoard({
    queues: [new BullMQAdapter(mergevideoBullMq), new BullMQAdapter(watermarkBullMq)],
    serverAdapter,
  });

  app.use('/ui', serverAdapter.getRouter());

  app.listen(4000, () => {
    console.log('Running on 4000...');
    console.log('For the UI, open http://localhost:4000/ui');
  });
};

run().catch((e) => console.error(e));