import { taskDataAtom } from "@/state/state"
import { PendingTask, QueueTaskType, syncService } from "@/sync/sync.service"
import { useAtom } from "jotai"
import * as crypto from 'expo-crypto'
import { Task } from "../../db/schema"
import { TaskManager } from "@/db/tasksManager"
import { useLocalSearchParams } from "expo-router"

export const useTodo = () => {
  const [todoData, setTodoData] = useAtom(taskDataAtom)
  const {workspace} = useLocalSearchParams()

  const createTodo = (todo: Omit<Task, 'id'>) => {
    setTodoData(prev => [...prev, {...todo, id: crypto.randomUUID()}])
    syncService.enqueue<Task>({
      id: crypto.randomUUID(),
      type: QueueTaskType.CREATE_TASK,
      payload: {
        ...todo,
        id: crypto.randomUUID()
      },
    })
  }

  const toggleTodo = (id: string) => {
    const currentTask = todoData.find((task) => task.id === id);
    if (!currentTask) return;

    const updatedTask: Task = {
      ...currentTask,
      isDone: !currentTask.isDone,
    };

    setTodoData((prev) =>
      prev.map((task) => (task.id === id ? updatedTask : task))
    );

    const queueTask: PendingTask<Task> = {
      id: crypto.randomUUID(),
      type: QueueTaskType.UPDATE_TASK,
      payload: updatedTask,
    };

    syncService.enqueue(queueTask);
  }

  const removeTodo = (id: string) => {
    setTodoData(prev => prev.filter((todo) => todo.id !== id))
    syncService.enqueue<string>({
      id: crypto.randomUUID(),
      type: QueueTaskType.DELETE_TASK,
      payload: id
    })
  }

  const loadTodos = async (workspaceId?: string) => {
    const todos = await TaskManager.getTasksFromWorkspace(workspaceId || workspace[0])
    setTodoData(todos || [])
  }

  return { createTodo, toggleTodo, removeTodo, loadTodos }
}
