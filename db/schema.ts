import {sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { TaskPriority } from './types/taskPriority.enum'
import { relations } from 'drizzle-orm'

export const workspaces = sqliteTable('workspaces', {
  id: text('id').primaryKey(),
  title: text('title').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
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
    .notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
})

export const userPreferences = sqliteTable('user_preferences', {
  id: text('id').primaryKey().$defaultFn(() => 'user'),
  defaultWorkspaceId: text('default_workspace_id')
    .references(() => workspaces.id, {onDelete: 'set null'}),
  lastActiveWorkspaceId: text('last_active_workspace_id')
    .references(() => workspaces.id, {onDelete: 'set null'}),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
})

export const timetrackers = sqliteTable('timetrackers', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  duration: integer('duration', { mode: 'timestamp_ms' }),
  pauseAmount: integer('pause_amount'),
  sessionAmount: integer('session_amount'),
  pauseDuration: integer('pause_duration', { mode: 'timestamp_ms' }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
})

export const timers = sqliteTable('timers', {
  id: text('id').primaryKey(),
  startedAt: integer('started_at', { mode: 'timestamp' }),
  duration: integer('duration', { mode: 'timestamp_ms' }).notNull(),

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

export type UserPreferences = typeof userPreferences.$inferSelect
export type UpdateUerPreferences = typeof userPreferences.$inferInsert
