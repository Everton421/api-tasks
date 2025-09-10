 import { server } from "./app.ts";
 
const port = 3000;
 

server.listen( { port: port, host:'0.0.0.0'} , ()=> console.log(`Server is running port: ${port}`))