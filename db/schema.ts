import {sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { TaskPriority } from './types/taskPriority.enum'

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  priority: text('priority', {
    enum: Object.values(TaskPriority) as [string, ...string[]]
      }).default(TaskPriority.LOW),
  isDone: integer({mode: 'boolean'}).default(false),
})

export type Task = typeof tasks.$inferSelect
export type CreateTask = typeof tasks.$inferInsert
