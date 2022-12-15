import * as express from 'express';
import analytics from './analytics';
import oauth from './oauth';
const router: express.Router = express.Router();

router.use('/analytics', analytics);
router.use('/oauth', oauth);

export default router;
