import { NotFoundError } from 'restify-errors';

import ITaskService from '../@types/interfaces/taskService.interface';

import { CreateTaskT, TaskT, UpdateTaskT } from '../@types/types/task.type';

import Task from '../database/models/Task';

export default class TaskService implements ITaskService {
  private _model;

  constructor() {
    this._model = Task;
  }

  public async createTask(task: CreateTaskT): Promise<TaskT> {
    const newTask = await this._model.create(task);
    return newTask;
  }

  public async getUserTasks(userId: number): Promise<TaskT[]> {
    const tasks = await this._model.findAll({ where: { userId } });
    return tasks;
  }

  public async editTask({ id, title, description, status }: UpdateTaskT): Promise<void> {
    const updated = this._model.update({ title, description, status }, { where: { id } });
    if (!updated) throw new NotFoundError('Task not found');
  }

  public async deleteTask(id: number): Promise<void> {
    const deleted = await this._model.destroy({ where: { id } });
    if (!deleted) throw new NotFoundError('Task not found');
  }
}
