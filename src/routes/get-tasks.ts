
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
 import { tasks } from "../database/schema.ts"
import z from "zod"
import { db } from "../database/client.ts"
import { and, asc, ilike,count, SQL } from "drizzle-orm"
 

export const getTasks:FastifyPluginAsyncZod = async (server)   => {
       server.get('/tasks',   { 
    schema:{
        tags:['tasks'],
        summary:"listar tarefas",
        querystring: z.object({
            search: z.string().optional(),
            orderBy: z.enum(['id','title','status']).optional().default('title'),
            page: z.coerce.number().optional().default(1)
        }),
         200: z.object({
                tasks: z.array(
                    z.object({
                        id: z.uuid(),
                        title:z.string(),
                        description: z.string(),
                        status: z.enum(["pendente", "em-andamento", "concluido", "cancelado"]),
                        priority: z.enum(["high", "medium", "low"]), 
                        createdAt: z.date(),
                        updatedAt: z.date(),
                    }), 
             ),
                    total: z.number()     

         }) 
      } 
    },
        
        async(request, reply)=>{

            const { orderBy, page, search } = request.query

                const conditions : SQL[] =[]

                if( search){
                    conditions.push( ilike( tasks.title, `%${search}%`))
                }

            const [ allTasks, total ] = await Promise.all([
                db.select()
                .from(tasks)
                .where( and( ...conditions)) 
                .groupBy( tasks.id )
                .limit(10)
                .offset(( page - 1 ) * 2 )
                .orderBy( asc(tasks[orderBy])),

                db.$count(tasks, and( ...conditions))
            
            ])

           
               return reply.status(200).send({ tasks: allTasks, total: total})

           
                
    } )
}
