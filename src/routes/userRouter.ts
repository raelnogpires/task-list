import { Router } from 'express';

import UserController from '../controller/userController';
import RegisterValidation from '../middleware/registerValidation';
import LoginValidation from '../middleware/loginValidation';

const router = Router();
const controller = new UserController();
const registerValidation = new RegisterValidation();
const loginValidation = new LoginValidation();

router
  .post('/register',
  registerValidation.validate,
  (req, res, next) => controller.registerUser(req, res, next));

router
  .post('/login',
  loginValidation.validate,
  (req, res, next) => controller.userLogin(req, res, next));

export default router;
