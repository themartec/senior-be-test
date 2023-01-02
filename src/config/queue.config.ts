import * as dotenv from 'dotenv';
dotenv.config();
import type { QueueConfig } from 'express/Queue'
import redisConfig from "../config/redis.config";

const queueConfig: QueueConfig = {
  connection: redisConfig.connection,
  queue: {},
  worker: {},
  jobs: {
    attempts: 0,
  }
}

export default queueConfig