import { Database } from './database';

import logger from './libs/logger';

export const init = async () => {
  await Database.initialize();
  logger('Database connected');
};

export const destroy = async () => {
  await Database.destroy();
  logger('Database disconnected');
}