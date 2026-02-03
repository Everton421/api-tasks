import { faker } from "@faker-js/faker";
import { db } from "../database/client";
import { tasks } from "../database/schema";
import { UUID } from "node:crypto";

type task  = {
       title:  string
       description: string,
       priority: "high" | "low" | "medium",
       status: "pendente" | "em-andamento" | "concluido" |  "cancelado",
       userId: string
}




export async function makeTask(userId: UUID, task :Partial<task>  ) {
        
       const resultInsertTask = await db.insert(tasks).values({
                    title:  task.title ?? faker.lorem.slug(4),
                    description:   task.description ?? faker.lorem.sentences({ min:1, max:1}),
                    priority: task.priority ?? 'high',
                    status: task.status ?? 'pendente',
                    userId:  userId
                }).returning()
                return resultInsertTask[0]
}