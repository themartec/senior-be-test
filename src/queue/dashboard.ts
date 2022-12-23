import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter  } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { defaultQueue, criticalQueue } from './index';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(defaultQueue), new BullMQAdapter(criticalQueue)],
  serverAdapter: serverAdapter,
});

export default serverAdapter.getRouter();