import * as express from 'express';
import AnalyticsController from '../../../controllers/analytics.controller';

const router: express.Router = express.Router();

router.get('/report', AnalyticsController.reportHandler);
router.get('/fetch-data', AnalyticsController.fetchDataHandler);
router.post('/subscribe', AnalyticsController.subscribeHandler);
router.post('/unsubscribe', AnalyticsController.unsubscribeHandler);

export default router;
