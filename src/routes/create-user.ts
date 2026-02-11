import { type FastifyPluginAsync } from "fastify";
import { checkJWT } from "../hooks/check-request-jwt";

export const createUser : FastifyPluginAsync = async ( server )=>{
    server.post('/user',{
        preHandler:[
            checkJWT
        ],schema:{
            tags:['user'],
            headers: z.
        }
    }, async (request, reply  )=>{

    })
}