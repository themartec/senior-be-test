import { createClient } from "redis";
import redisConfig from "../config/redis.config";

export class RedisCache {
  private client;
  constructor() {
    this.client = createClient({
        socket: redisConfig.connection
      });
    this.client.connect();
    this.client.on("connect", () => {
      console.log(`Redis connection established`);
    });

    this.client.on("error", (error) => {
      console.error(`Redis error, service degraded: ${error}`);
    });
  }

  async get<Proccess>(key: string): Promise<Proccess> {
    const data = await this.client.get(key);
    return JSON.parse(data) as Proccess;
  }

  async set<T>(key: string, value: string): Promise<T> {
    return await this.client.set(key, value);
  }
}

export default new RedisCache()