 import { server } from "./app.ts";
 
const port = 3000;
 

server.listen( { port: port} , ()=> console.log(`Server is running port: ${port}`))