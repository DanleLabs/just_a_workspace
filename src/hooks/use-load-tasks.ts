import { TaskManager } from "@/db/tasksManager"
import { taskDataAtom } from "@/state/state"
import { useAtom } from "jotai"


export const useLoadTasks = async () => {
  const [, setTaskData] = useAtom(taskDataAtom)

  const tasks = await TaskManager.getTasks()

  if (!tasks.length) throw new Error('No tasks were found.')

  setTaskData(tasks)
}
