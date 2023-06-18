import { Router } from 'express';
const router = Router();

import auth from '../middlewares/auth.js';
import MessageController from '../controllers/MessageController.js';

router.post('/create', [auth], MessageController.create);

export default router;