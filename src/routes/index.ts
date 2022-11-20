import 'express-async-errors';
import express, { Router } from 'express';
import passport from 'passport';
import { index } from './controller';
import checkPassport from '../middlewares/check-passport';
import oauth2 from './oauth2';
import reports from './reports';
import charts from './charts';

const router: Router = express.Router();

// home page
router.get('/', index);

// oauth2 support routes
router.use('/oauth2', oauth2);

// authenticated with visualization reports
router.use('/reports', checkPassport, reports);

// authenticated using google access token using bearer strategy to show only visualization reports, for pdf generation
router.use('/charts', passport.authenticate('bearer', { session: false }), checkPassport, charts);

export default router;
