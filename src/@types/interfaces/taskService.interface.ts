import { CreateTaskT, TaskT } from "../types/task.type";

export default interface ITaskService {
  createTask(task: CreateTaskT): Promise<TaskT>;
}
