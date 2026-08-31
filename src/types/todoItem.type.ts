export enum TaskPriority {
  LOW,
  MIDDLE,
  HIGH,
}

export interface ITaskData {
  taskText: string,
  isDone: boolean,
  priority: TaskPriority,
  id: string,
}
