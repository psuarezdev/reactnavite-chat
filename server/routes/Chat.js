import { Router } from 'express';
const router = Router();

import auth from '../middlewares/auth.js';
import ChatController from '../controllers/ChatController.js';

router.get('/all', [auth], ChatController.all);
router.get('/one/:chatId', [auth], ChatController.one);
router.get('/:chatId/messages', [auth], ChatController.messages);

router.post('/create', [auth], ChatController.create);

router.delete('/delete', [auth], ChatController.remove);

export default router;