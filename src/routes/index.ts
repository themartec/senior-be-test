import 'express-async-errors';
import express, { Router } from 'express';
import { index } from './controller';
import checkPassport from '../middlewares/check-passport';

import reports from './reports';
import oauth2 from './oauth2';

const router: Router = express.Router();

// home page
router.get('/', index);

// oauth2 support routes
router.use('/oauth2', oauth2);

// authenticated with visualization reports
router.use('/reports', checkPassport, reports);

export default router;
