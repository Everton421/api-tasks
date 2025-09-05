
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
 import { tasks } from "../database/schema.ts"
import z from "zod"
import { randomBytes, randomUUID } from "node:crypto"
 

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
                    })       
             )
         })
      } 
    },
        
        async(request, reply)=>{
            const fakeDataTask = [ { id: randomUUID(), title: "teste", description:"teste descricao" },]
            reply.send( { tasks: fakeDataTask})
             
            
    } )
}
