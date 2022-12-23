import '../bootstrap';
import { Queue } from 'bullmq';

export const connection = {
  connection: {
    port: Number(process.env.REDIS_PORT) || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    db: Number(process.env.REDIS_DB) || 1
  }
};

export const defaultQueueName = 'default';

export const criticalQueueName = 'critical';

export const defaultQueue = new Queue(defaultQueueName, connection);

export const criticalQueue = new Queue(criticalQueueName, connection);
