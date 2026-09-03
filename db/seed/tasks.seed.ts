import { db } from "../client";
import { CreateTask, Task, tasks } from "../schema";
import { TaskPriority } from "../types/taskPriority.enum";

export const data: CreateTask[] = [
  {
    id: 'task-1',
    title: 'Fix payment bug',
    description: 'Resolve the payment validation issue affecting Visa transactions in the checkout flow.',
    isDone: false,
    priority: TaskPriority.HIGH,
  },
  {
    id: 'task-2',
    title: 'Review sprint goals',
    description: 'Align the backlog with the current milestone and confirm the acceptance criteria for the next release.',
    isDone: false,
    priority: TaskPriority.MIDDLE,
  },
  {
    id: 'task-2',
    title: 'Update project documentation',
    description: 'Refresh the onboarding guide and add setup notes for the new environment variables.',
    isDone: true,
    priority: TaskPriority.LOW,
  },
  {
    id: 'task-3',
    title: 'Refactor login screen',
    description: 'Simplify the login validation logic and improve error state handling for invalid credentials.',
    isDone: true,
    priority: TaskPriority.MIDDLE,
  },
  {
    id: 'task-4',
    title: 'Clean unused imports',
    description: 'Remove stale imports and dead code left behind from previous refactors.',
    isDone: false,
    priority: TaskPriority.LOW,
  },
]

export const seedTasks = async (): Promise<Task[] | null> => {
  try {
    const tasksList = await db
      .insert(tasks)
      .values(data)
      .onConflictDoNothing()
      .returning()

    return tasksList ?? null
  } catch (err) {
    console.error('Error while seeding tasks.')
    throw err
  }
}
