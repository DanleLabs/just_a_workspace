import { activeWorkspace, taskDataAtom } from "@/state/state"
import { PendingTask, QueueTaskType, syncService } from "@/sync/sync.service"
import { useAtom, useAtomValue } from "jotai"
import * as crypto from 'expo-crypto'
import { Task } from "../../db/schema"
import { TaskManager } from "@/db/tasksManager"
import { useLocalSearchParams } from "expo-router"

export const useTodo = () => {
  const [todoData, setTodoData] = useAtom(taskDataAtom)
  const currentWorkspace = useAtomValue(activeWorkspace)
  const syncTodo = async () => {
    setTimeout(async () => {
      const data = await TaskManager.getTasksFromWorkspace(currentWorkspace!.id)
      if (!data) {
        setTodoData([])
        return
      }
      setTodoData(data)
      console.log('Todo are in sync now. ', Date.now())
    }, 800)
  }

  const createTodo = (todo: Omit<Task, 'id'>) => {
    setTodoData(prev => [...prev, { ...todo, id: crypto.randomUUID() }])
    console.log(todo)
    syncService.enqueue<Task>({
      id: crypto.randomUUID(),
      type: QueueTaskType.CREATE_TASK,
      payload: {
        ...todo,
        id: crypto.randomUUID()
      },
    })
    syncTodo()
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
    syncTodo()
  }

  const removeTodo = (id: string) => {
    setTodoData(prev => prev.filter((todo) => todo.id !== id))
    syncService.enqueue<string>({
      id: crypto.randomUUID(),
      type: QueueTaskType.DELETE_TASK,
      payload: id
    })
    syncTodo()
  }

  const loadTodos = async (workspaceId?: string) => {
    if (!currentWorkspace) return
    const todos = await TaskManager.getTasksFromWorkspace(workspaceId ?? currentWorkspace!.id)
    setTodoData(todos ?? [])
  }

  return { createTodo, toggleTodo, removeTodo, loadTodos }
}
