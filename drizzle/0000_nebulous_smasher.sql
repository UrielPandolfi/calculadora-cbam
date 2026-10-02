CREATE TABLE `conversion_leads` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`agency` text NOT NULL,
	`city` text NOT NULL,
	`brand` text NOT NULL,
	`phone` text,
	`preference` text NOT NULL,
	`preferred_date` text,
	`preferred_time` text,
	`answers` text NOT NULL,
	`result` text NOT NULL,
	`consent_version` text NOT NULL,
	`email_status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL
);
