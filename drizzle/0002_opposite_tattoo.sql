CREATE TABLE `user_preferences` (
	`id` text PRIMARY KEY NOT NULL,
	`default_workspace_id` text,
	`last_active_workspace_id` text,
	FOREIGN KEY (`default_workspace_id`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`last_active_workspace_id`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE set null
);
