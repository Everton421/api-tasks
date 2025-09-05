
import fastify  from "fastify";
import { getTasks } from "./routes/get-tasks.ts";
import fastifySwagger from "@fastify/swagger";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import scalarApiReference from "@scalar/fastify-api-reference";

 const server = fastify({
    logger:true
 })
 
server.register(fastifySwagger,{
   openapi:{
      info:{
         title:"Tarefas API",
         version:"1.0.0"
      } ,
   },
       transform: jsonSchemaTransform 
 }
)

server.register(scalarApiReference,{
   routePrefix:'/docs',
 }
)

server.register(getTasks)
 export { server }
  