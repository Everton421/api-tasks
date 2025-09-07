
import fastify  from "fastify";
import { getTasks } from "./routes/get-tasks.ts";
import fastifySwagger from "@fastify/swagger";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler , type ZodTypeProvider} from "fastify-type-provider-zod";
import scalarApiReference from "@scalar/fastify-api-reference";
import { putTasks } from "./routes/put-tasks.ts";
import { createTasks } from "./routes/create-tasks.ts";
 
import cors from '@fastify/cors'

 const server = fastify({
   logger:{
      transport:{
         target:'pino-pretty',
         options:{
         translateTime: 'HH:MM:ss Z',
         ignore: 'pid hostname',   
         },
      } ,
      }
   }
  ).withTypeProvider<ZodTypeProvider>()
 
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
 })

   server.register(cors)
 server.setSerializerCompiler(serializerCompiler )

 server.setValidatorCompiler(validatorCompiler)

server.register(getTasks)
server.register(putTasks)
server.register(createTasks)


 export { server }
  