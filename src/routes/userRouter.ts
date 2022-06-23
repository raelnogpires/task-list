import { Router } from 'express';

import UserController from '../controller/userController';
import RegisterValidation from '../middleware/registerValidation';

const router = Router();
const controller = new UserController();
const middleware = new RegisterValidation();

router
  .post('/register',
  middleware.validate,
  (req, res, next) => controller.registerUser(req, res, next));

export default router;
