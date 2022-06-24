import { CreateTaskT, TaskT, UpdateTaskT } from "../types/task.type";

export default interface ITaskService {
  createTask(task: CreateTaskT): Promise<TaskT>;
  getUserTasks(userId: number): Promise<TaskT[]>;
  editTask(task: UpdateTaskT): Promise<void>;
}
