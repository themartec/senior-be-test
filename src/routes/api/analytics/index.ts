import * as express from 'express';
import AnalyticsController from '../../../controllers/analytics.controller';

const router: express.Router = express.Router();

router.get('/report', AnalyticsController.reportHandler);

export default router;
