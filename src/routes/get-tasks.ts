
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
 import { tasks } from "../database/schema.ts"
import z from "zod"
import { randomBytes, randomUUID } from "node:crypto"
import { db } from "../database/client.ts"
import { asc } from "drizzle-orm"
 

export const getTasks:FastifyPluginAsyncZod = async (server)   => {
       server.get('/tasks',   { 
    schema:{
        tags:['tasks'],
        summary:"listar tarefas",
         200: z.object({
                tasks: z.array(
                    z.object({
                        id: z.uuid(),
                        title:z.string(),
                        description: z.string(),
                        status: z.enum(["pendente", "em-andamento", "concluido", "cancelado"]),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                    })       
             )
         }),
         404:z.null().describe("Nenhuma tarefa encontrada")
      } 
    },
        
        async(request, reply)=>{

            const allTasks = await db.select().from(tasks).orderBy( asc(tasks.createdAt)) 
                if(allTasks.length > 0 ) return reply.status(200).send({ tasks: allTasks})

                    return reply.status(404).send()
                
    } )
}
