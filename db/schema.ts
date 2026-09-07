import {sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { TaskPriority } from './types/taskPriority.enum'
import { relations } from 'drizzle-orm'

export const workspaces = sqliteTable('workspaces', {
  id: text('id').primaryKey(),
  title: text('title').notNull().unique(),
})

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  priority: text('priority', {
    enum: Object.values(TaskPriority) as [string, ...string[]]
      }).default(TaskPriority.LOW),
  isDone: integer({ mode: 'boolean' }).default(false),
  workspaceId: text('workspace_id')
    .references(() => workspaces.id, { onDelete: 'cascade' })
    .notNull()
})

export const workspaceRelation = relations(workspaces, ({ many }) => ({
  tasks: many(tasks)
}))

export const tasksRelations = relations(tasks, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [tasks.workspaceId],
    references: [workspaces.id]
  })
}))

export type Workspace = typeof workspaces.$inferSelect
export type CreateWorkspace = typeof workspaces.$inferInsert

export type Task = typeof tasks.$inferSelect
export type CreateTask = typeof tasks.$inferInsert
