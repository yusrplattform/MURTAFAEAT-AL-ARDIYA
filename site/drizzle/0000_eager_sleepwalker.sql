CREATE TABLE `request_limits` (
	`id` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `service_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`service` text NOT NULL,
	`property` text NOT NULL,
	`city` text NOT NULL,
	`details` text NOT NULL,
	`created_at` integer NOT NULL
);
