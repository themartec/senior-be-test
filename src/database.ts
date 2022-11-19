import dotenv from 'dotenv';
import 'reflect-metadata';
import { models } from './models';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'themartec_backend_development',
  password: process.env.DB_PASS || 'cjAEQJs3',
  database: process.env.DB_NAME || 'themartec_backend_development',
  synchronize: false,
  logging: true,
  entities: models,
  subscribers: [],
  migrations: [
    `${__dirname}/migrations/**/*{.js,.ts}`
  ],
  namingStrategy: new SnakeNamingStrategy()
});