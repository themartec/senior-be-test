import * as express from 'express';
import validateAnalyticsRequest from '../../middlewares/validate.analytics.middleware';
import analytics from './analytics';
import oauth from './oauth';

const router: express.Router = express.Router();

router.use('/analytics', validateAnalyticsRequest, analytics);
// router.use('/chart', validateChartRequest, chart);
router.use('/oauth', oauth);

export default router;
