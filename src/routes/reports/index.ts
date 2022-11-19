import 'express-async-errors';
import express, { Router } from 'express';
import subscribers from './subscribers';
import { index } from './controller';

const router: Router = express.Router();

router.get('/', index);
router.use('/subscribers', subscribers);

export default router;
