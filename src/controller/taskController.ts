import { Request, Response } from 'express';
import TaskService from '../service/taskService';

export default class TaskController {
  private _service;

  constructor() {
    this._service = new TaskService();
  }

  public async createTask(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { userId } = req.headers;
    const taskObj = { userId, ...req.body };
    const task = await this._service.createTask(taskObj);
    return res.status(201).json(task);
  }
}
