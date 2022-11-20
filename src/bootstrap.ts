import dotenv from 'dotenv';

dotenv.config();

import { AppDataSource } from './database';
import logger from './libs/logger';

AppDataSource
  .initialize()
  .then(() => { logger('Database connected'); })
  .catch(error => logger(error));