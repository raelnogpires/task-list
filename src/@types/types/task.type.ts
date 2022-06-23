export type TaskT = {
  id: number,
  title: string,
  description?: string,
  status: string,
  userId: number,
};

export type CreateTaskT = Omit<TaskT, 'id'>;
