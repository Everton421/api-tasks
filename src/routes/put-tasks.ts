import { request } from "http"
import z from "zod"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../database/client.ts"
import { priorityTask, tasks } from "../database/schema.ts"
import { eq } from "drizzle-orm"
import { checkJWT } from "../hooks/check-request-jwt.ts"

export const putTasks:FastifyPluginAsyncZod = async ( server ) =>{
    server.put('/tasks/:id',{
         preHandler:[
                    checkJWT
                ],
        schema:{
            tags:['tasks'],
            summary:'Atualizar uma tarefa ',
            params: z.object({
                id: z.uuid(),
            }),
            headers: z.object({
                authorization: z.string()
            }),
            body: z.object({
                title: z.string().min(2).max(100),
                description: z.string().min(2).max(1000),
                status: z.enum(["pendente", "em-andamento", "concluido", "cancelado"]),
                priority:z.enum(["high","medium","low"]), 
            }),
            response:{
                200: z.object({
                    task: z.object({
                        id: z.uuid(),
                        title: z.string(),
                        description: z.string(),
                        priority:z.enum(["high","medium","low"]), 
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
        
        if(verifiTask.length > 0 ){

            const updateTask = await db.update(tasks).set({
                title: request.body.title,
                description: request.body.description,
                priority: request.body.priority,
                status: request.body.status,
                updatedAt: new Date()
            })
                return reply.status(200).send({ task:   { id:taskId , priority:request.body.priority ,  title: request.body.title, description: request.body.description,
                    status: request.body.status, createdAt: verifiTask[0].createdAt, updatedAt: new Date()
                }  })
        }

             return reply.status(404).send( )


    })

}