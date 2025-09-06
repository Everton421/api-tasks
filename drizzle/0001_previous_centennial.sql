CREATE TYPE "public"."status" AS ENUM('pedente', 'em-andamento', 'concluido', 'cancelado');--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "status" "status" DEFAULT 'pedente' NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;