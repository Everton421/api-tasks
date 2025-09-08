import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../database/client.ts";
import { tasks } from "../database/schema.ts";
import { checkJWT } from "../hooks/check-request-jwt.ts";

export const createTasks: FastifyPluginAsyncZod = async ( server )=>{
    server.post('/tasks',{
         preHandler:[
                    checkJWT
                ],
        schema:{
            tags:['tasks'],
               headers: z.object({
                        authorization: z.string()
                    }),
            summary:  'Criar uma nova tarefa',
             body: z.object({
                title: z.string(),
                description: z.string(),
                status: z.enum(["pendente", "em-andamento", "concluido", "cancelado"]),
                priority: z.enum(["high", "medium", "low"])
             }),
             response:{
                201: z.object({ id: z.uuid() }).describe("Tarefa criada com sucesso")
             }
        }
    } , async ( request, reply )=>{
        const userId = ( request as any ).user?.sub

            console.log(request.user)

            const resultInsertTask = await db.insert(tasks).values({
                title: request.body.title,
                description: request.body.description,
                priority: request.body.priority,
                status: request.body.status,
                userId: userId
            }).returning()
 

        return reply.status(201).send({ id: resultInsertTask[0].id}); 
    }

)

}