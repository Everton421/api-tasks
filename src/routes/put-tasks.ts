import { request } from "http"
import z from "zod"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../database/client"
import { tasks } from "../database/schema"
import { eq } from "drizzle-orm"

export const putTasks:FastifyPluginAsyncZod = async ( server ) =>{
    server.put('/tasks/:id',{
        schema:{
            tags:['tasks'],
            summary:'Atualizar uma tarefa ',
            params: z.object({
                id: z.uuid()
            }),
            response:{
                200: z.object({
                    task: z.object({
                        id: z.uuid(),
                        title: z.string(),
                        description: z.string(),
                        status: z.enum(["pendente", "em-andamento", "concluido", "cancelado"]),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                    })
                }),
                404: z.null().describe("Tarefa não encontrada") 
            }
        }
    },  
    async ( request, reply)=>{
        const taskId = request.params.id;
        const verifiTask = await db.select().from(tasks).where(  eq(tasks.id, taskId))
        
    }
)

}