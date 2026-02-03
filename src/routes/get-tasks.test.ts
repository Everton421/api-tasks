import test from "node:test";
import { server } from "../app";
import { makeTask } from "../factories/make-tasks";

 
    test(" get tesks", async ()=>{
    
            await server.ready();

        
        const task = await makeTask({})

    })
