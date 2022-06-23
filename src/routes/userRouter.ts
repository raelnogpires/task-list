import { Router } from 'express';

import UserController from '../controller/userController';
import RegisterValidation from '../middleware/registerValidation';

const router = Router();
const controller = new UserController();
const middleware = new RegisterValidation();

router
  .post('/register', middleware.validate, (req, res) => controller.registerUser(req, res));

export default router;
