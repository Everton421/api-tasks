import { desc } from "drizzle-orm";
import { pgEnum } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";


export const statusTask = pgEnum("status", ["pedente", "em-andamento", "concluido", "cancelado"]); 

export const tasks = pgTable("tasks",{
    id: uuid().primaryKey().defaultRandom(),
    title:text().notNull(),
    description:text().notNull(),
    status: statusTask().notNull().default("pedente"),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
})
