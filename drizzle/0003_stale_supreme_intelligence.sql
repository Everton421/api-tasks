CREATE TYPE "public"."priority" AS ENUM('high', 'low', 'medium');--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "priority" "priority" DEFAULT 'low' NOT NULL;