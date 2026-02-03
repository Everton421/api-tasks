CREATE TYPE "public"."priority" AS ENUM('high', 'low', 'medium');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pendente', 'em-andamento', 'concluido', 'cancelado');--> statement-breakpoint
CREATE TYPE "public"."user-role" AS ENUM('suport', 'developer');--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" "status" DEFAULT 'pendente' NOT NULL,
	"priority" "priority" DEFAULT 'low' NOT NULL,
	"userId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "user-role" DEFAULT 'suport' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;