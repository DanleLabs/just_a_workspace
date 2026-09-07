import { eq } from "drizzle-orm"
import { db } from "../../db/client"
import { CreateTask, Task, tasks, workspaces } from "../../db/schema"

 export const TaskManager = {
  getTasks: async (): Promise<Task[]> => {
    return await db.select().from(tasks)
  },

  addTask: async (payload: CreateTask): Promise<Task | null> => {
    try {
      const [task] = await db.insert(tasks).values(payload).returning()
      return task ?? null
    } catch (err) {
      console.error('Error while adding.')
      throw err
    }
  },

  addManyTasks: async (payload: CreateTask[]): Promise<Task[] | null> => {
    try {
      const tasksList = await db
        .insert(tasks)
        .values(payload)
        .returning()
      return tasksList ?? null
    } catch (err) {
      console.error('Error while adding tasks.')
      throw err
    }
  },

  updateTask: async (taskId: string, payload: Partial<CreateTask>): Promise<Task | null>  => {
    try {
      const [newTask] = await db
        .update(tasks)
        .set(payload)
        .where(eq(tasks.id, taskId))
        .returning()

      return newTask ?? null
    } catch (err) {
      console.error('Error while updating the task.')
      throw err
    }
  },

  removeTask: async (taskId: string): Promise<Task | null> => {
    try {
      const [task] = await db.delete(tasks).where(eq(tasks.id, taskId)).returning()
      return task ?? null
    } catch (err) {
      console.error('Error while deleting the task.')
      throw err
    }
  },

   getTasksFromWorkspace: async (workspaceId: string): Promise<Task[] | null> => {
     const workspace = await db.query.workspaces.findFirst({
       where: eq(workspaces.id, workspaceId),
       with: {
         tasks: true,
       }
     })
     if (!workspace) return null

     return workspace.tasks
  }
}
