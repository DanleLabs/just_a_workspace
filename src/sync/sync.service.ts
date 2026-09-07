import { TaskManager } from "@/db/tasksManager";
import { db } from "../../db/client";
import { WorkspaceManager } from "@/db/workspaceManager";

export enum QueueTaskType {
  CREATE_TASK = 'create-task',
  UPDATE_TASK = 'update-task',
  DELETE_TASK = 'delete-task',
  CREATE_WORKSPACE = 'create-workspace',
  UDATE_WORKSPACE = 'update-workspace'
}

export type PendingTask<T> = {
  id: string;
  type: QueueTaskType;
  payload: T;
}

class SyncService {
  private queue: PendingTask<any>[] = []
  private isProcessing: boolean = false
  private db = db

  public enqueue<T>(task: PendingTask<T>) {
    this.queue.push(task)
    console.log('Task: ', task.id, ' is enqueued. TIMESTAMP: ', Date.now())
    this.processQueue()
  }

  private async processQueue() {

    if (this.isProcessing || this.queue.length === 0 || !this.db) return

    this.isProcessing = true

    while (this.queue.length > 0) {
      const task = this.queue[0]

      try {
        console.log('Task: ', task.id, ' is processing. TIMESTAMP: ', Date.now())
        await this.excecuteTransaction(task)
      } catch (err) {
        console.error('Failed to sync task:', task, err)
        break;
      } finally {
        this.queue.shift()
        this.isProcessing = false
      }
    }
  }

  private async excecuteTransaction(task: PendingTask<any>) {
    if (!this.db) return
    switch (task.type) {
      case QueueTaskType.CREATE_TASK:
        await TaskManager.addTask(task.payload)
        console.log('Task: ', task.id, ' is added to Sqlite. TIMESTAMP: ', Date.now())
        break;
      case QueueTaskType.UPDATE_TASK:
        await TaskManager.updateTask(task.payload.id, task.payload)
        console.log('Task: ', task.id, ' updated. TIMESTAMP: ', Date.now())
        break;
      case QueueTaskType.DELETE_TASK:
        await TaskManager.removeTask(task.payload)
        console.log('Task: ', task.id, ' removed. TIMESTAMP: ', Date.now())
        break;
      case QueueTaskType.CREATE_WORKSPACE:
        await WorkspaceManager.createWorkspace(task.payload)
        console.log('Workspace: ', task.id, ' created. TIMESTAMP: ', Date.now())
        break;
      }
  }

}

export const syncService = new SyncService()
