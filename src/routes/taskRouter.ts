import { Router } from 'express';

import AuthMiddleware from '../middleware/authMiddleware';
import TaskController from '../controller/taskController';
import TaskValidation from '../middleware/taskValidation';

const router = Router();
const controller = new TaskController();
const auth = new AuthMiddleware();
const taskValidation = new TaskValidation();

router
  .post('/',
  auth.validateToken,
  taskValidation.validateCreateTask,
  (req, res) => controller.createTask(req, res));

export default router;
