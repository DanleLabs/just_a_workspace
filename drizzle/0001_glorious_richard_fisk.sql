CREATE TABLE `workspaces` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `workspaces_title_unique` ON `workspaces` (`title`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`priority` text DEFAULT 'low',
	`isDone` integer DEFAULT false,
	`workspace_id` text NOT NULL,
	FOREIGN KEY (`workspace_id`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_tasks`("id", "title", "description", "priority", "isDone", "workspace_id") SELECT "id", "title", "description", "priority", "isDone", "workspace_id" FROM `tasks`;--> statement-breakpoint
DROP TABLE `tasks`;--> statement-breakpoint
ALTER TABLE `__new_tasks` RENAME TO `tasks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;