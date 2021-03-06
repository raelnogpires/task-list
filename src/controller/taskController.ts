import { NextFunction, Request, Response } from 'express';

import UserService from '../service/userService';
import TaskService from '../service/taskService';

import { BadRequestError, InternalServerError } from 'restify-errors';

export default class TaskController {
  private _taskService;
  private _userService;

  constructor() {
    this._taskService = new TaskService();
    this._userService = new UserService();
  }

  public async createTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { userEmail } = req.headers;
    if (!userEmail) {
      const err = new InternalServerError();
      return next(err);
    }

    const user = await this._userService.findUserByEmail(userEmail);
    if (!user) {
      const err = new BadRequestError('User not found');
      return next(err);
    }

    const taskObj = { userId: user.id, ...req.body };
    const task = await this._taskService.createTask(taskObj);
    return res.status(201).json(task);
  }

  public async getUserTasks(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { userEmail } = req.headers;
    if (!userEmail) {
      const err = new InternalServerError();
      return next(err);
    }

    const user = await this._userService.findUserByEmail(userEmail);
    if (!user) {
      const err = new BadRequestError('User not found');
      return next(err);
    }

    const tasks = await this._taskService.getUserTasks(user.id);
    return res.status(200).json(tasks);
  }

  public async editTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const taskObj = { id: parseInt(id), ...req.body };
      await this._taskService.editTask(taskObj);
      return res.status(200).json({ message: 'Task updated with success' });
    } catch (error) {
      return next(error);
    }
  }

  public async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      await this._taskService.deleteTask(parseInt(id));
      return res.status(200).json({ message: 'Task deleted with success' });
    } catch (error) {
      return next(error);
    }
  }
}
