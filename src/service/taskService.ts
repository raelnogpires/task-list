import { CreateTaskT, TaskT } from '../@types/types/task.type';
import Task from '../database/models/Task';

export default class TaskService {
  private _model;

  constructor() {
    this._model = Task;
  }

  public async createTask(task: CreateTaskT): Promise<TaskT> {
    const newTask = await this._model.create(task);
    return newTask;
  }
}
