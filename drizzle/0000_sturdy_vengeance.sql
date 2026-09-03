CREATE TABLE `tasks` (
	`id` text PRIMARY KEY DEFAULT '7ab4f163-fe76-4580-8383-af12ec15c016' NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`priority` text DEFAULT 'low',
	`isDone` integer DEFAULT false
);
