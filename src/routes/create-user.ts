import { checkJWT } from "../hooks/check-request-jwt.ts";
import z from "zod";
import { makeUser } from "../factories/make-user.ts";
import { randomUUID } from "crypto";
import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const createUser : FastifyPluginAsyncZod = async ( server )=>{
    server.post('/user',{
        preHandler:[
            checkJWT
        ],schema:{
            tags:['user'],
            headers: z.object({
                authorization: z.string(),
            }),
            summary : 'Criar Usuário',
            body: z.object({
                email: z.string(),
                name: z.string(),
                password: z.string(),
                role: z.enum(["suport" , "developer" ] )
            }),
            response : { 
                201  : z.object({
                    id: z.uuid(),
                 })
            }
        }
    }, async (request, reply  )=>{

            const id = randomUUID();
                const { name, email, password, role  } = request.body ;

            const user = await makeUser({
                    email,
                    id,
                    name,
                    password,
                    role
                });

                return reply.status(201).send({ id:user.id});
    })
}