export type TaskStatusT = 'Pending' | 'In progress' | 'Done';

export type TaskT = {
  id: number,
  title: string,
  description?: string,
  status: TaskStatusT,
  userId: number,
};

export type CreateTaskT = Omit<TaskT, 'id'>;
