CREATE TYPE "public"."user-role" AS ENUM('suport', 'developer');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "user-role" DEFAULT 'suport' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "userId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;