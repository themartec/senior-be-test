import 'express-async-errors';
import express, { Router } from 'express';
import { create, destroy } from './controller';

const router: Router = express.Router();

router.post('/', create);
router.delete('/', destroy);

export default router;
