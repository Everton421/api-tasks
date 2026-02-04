import { faker } from "@faker-js/faker";
import { db } from "../database/client.ts";
import { tasks } from "../database/schema.ts";
import {    randomUUID, type UUID } from "node:crypto";
import { makeUser } from "./make-user.ts";

type task  = {
       title:  string
       description: string,
       priority: "high" | "low" | "medium",
       status: "pendente" | "em-andamento" | "concluido" |  "cancelado",
       userId: UUID
}




export async function makeTask( task? : task   ) {

              let userId:UUID = randomUUID();

              if( task && !task?.userId ){
                      const resultMakeuser  =  await makeUser();
                        userId = resultMakeuser.id as UUID
                     }

       const resultInsertTask = await db.insert(tasks).values({
                    title:  task?.title ?? faker.lorem.slug(4),
                    description:   task?.description ?? faker.lorem.sentences({ min:1, max:1}),
                    priority: task?.priority ?? 'high',
                    status: task?.status ?? 'pendente',
                    userId:  task?.userId ?? userId
                }).returning()
                return resultInsertTask[0]
}