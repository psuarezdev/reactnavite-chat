import { Router } from 'express';
import multer from 'multer';

import UserController from '../controllers/UserController.js';
import auth from '../middlewares/auth.js';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/avatars/'),
  filename: (req, file, cb) => cb(null, `avatar-${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

router.get('/all', [auth], UserController.all);
router.get('/:id', [auth], UserController.one);

router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.put('/update/:id', [auth], UserController.update);

export default router;