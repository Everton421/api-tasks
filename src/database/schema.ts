import { desc } from "drizzle-orm";
import { pgEnum } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";


export const statusTask = pgEnum("status", ["pendente", "em-andamento", "concluido", "cancelado"]); 

export const priorityTask = pgEnum("priority", [ "high", "low", "medium"])

export const userRole = pgEnum('user-role',[
    'suport',
    'developer'
])

export const tasks = pgTable("tasks",{
    id: uuid().primaryKey().defaultRandom(),
    title:text().notNull(),
    description:text().notNull(),
    status: statusTask().notNull().default("pendente"),
    priority: priorityTask().notNull().default("low"),
    userId: uuid().notNull().references(()=> users.id),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
 }  
)

export const users = pgTable('users',{
    id:uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    email: text().notNull(),
    password: text().notNull(),
     role:  userRole().notNull().default('suport'),
})