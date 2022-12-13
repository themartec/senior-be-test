import * as express from 'express';
import analytics from './analytics';
const router: express.Router = express.Router();

router.use('/analytics', analytics);

export default router;
