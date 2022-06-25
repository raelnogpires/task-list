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
  taskValidation.validateTask,
  (req, res, next) => controller.createTask(req, res, next));

router
  .get('/',
  auth.validateToken,
  (req, res, next) => controller.getUserTasks(req, res, next));

router
  .put('/:id',
  auth.validateToken,
  taskValidation.validateTask,
  (req, res) => controller.editTask(req, res));

router
  .delete('/:id',
  auth.validateToken,
  (req, res) => controller.deleteTask(req, res));

export default router;
