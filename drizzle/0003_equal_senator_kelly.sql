CREATE TABLE `timers` (
	`id` text PRIMARY KEY NOT NULL,
	`started_at` integer,
	`duration` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `timetrackers` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`duration` integer,
	`pause_amount` integer,
	`session_amount` integer,
	`pause_duration` integer,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
ALTER TABLE `tasks` ADD `created_at` integer;--> statement-breakpoint
ALTER TABLE `tasks` ADD `updated_at` integer;--> statement-breakpoint
ALTER TABLE `user_preferences` ADD `created_at` integer;--> statement-breakpoint
ALTER TABLE `user_preferences` ADD `updated_at` integer;--> statement-breakpoint
ALTER TABLE `workspaces` ADD `created_at` integer;--> statement-breakpoint
ALTER TABLE `workspaces` ADD `updated_at` integer;