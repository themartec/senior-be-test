import 'express-async-errors';
import express, { Router } from 'express';
import { index } from './controller';

const router: Router = express.Router();

router.get('/', index);

export default router;
