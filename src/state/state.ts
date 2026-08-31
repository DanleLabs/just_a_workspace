import { ITaskData, TaskPriority } from '@/types/todoItem.type'
import { atom } from 'jotai'

export const taskDataAtom = atom<ITaskData[]>([
  { taskText: "Review sprint goals", isDone: false, priority: TaskPriority.HIGH, id: '1' },
  { taskText: "Refactor login screen", isDone: true, priority: TaskPriority.MIDDLE, id: '2'  },
  { taskText: "Update documentation", isDone: false, priority: TaskPriority.LOW, id: '3'  },
  { taskText: "Fix payment bug", isDone: false, priority: TaskPriority.HIGH, id: '4'  },
  { taskText: "Clean up unused imports", isDone: true, priority: TaskPriority.LOW, id: '5'  },
])
