import dotenv from 'dotenv';

dotenv.config();

import { AppDataSource } from './database';
import logger from './libs/logger';

export const init = async () => {
  await AppDataSource.initialize();
  logger('Database connected');
};
