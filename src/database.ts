import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

import { models } from './models';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const datasource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'themartec_backend',
  password: process.env.DB_PASS || 'cjAEQJs3',
  database: process.env.DB_NAME || 'themartec_backend_development',
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: models,
  subscribers: [],
  migrations: [
    `${__dirname}/migrations/**/*{.js,.ts}`
  ],
  namingStrategy: new SnakeNamingStrategy()
});

export const Database = datasource;