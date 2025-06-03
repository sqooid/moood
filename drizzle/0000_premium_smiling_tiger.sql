CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text,
	`google_id` text,
	`username` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_uuid_unique` ON `user` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_google_id_unique` ON `user` (`google_id`);