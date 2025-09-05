import { desc } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks",{
    id: uuid().primaryKey().defaultRandom(),
    title:text().notNull(),
    description:text().notNull(),
})