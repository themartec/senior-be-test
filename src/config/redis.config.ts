import * as dotenv from 'dotenv';
dotenv.config();
import type { RedisConnection } from '../types/types'
const redisConfig: RedisConnection  = {
  connection:  {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT) || 6379,
  }
}

export default redisConfig