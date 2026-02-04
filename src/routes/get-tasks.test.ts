import test from "node:test";
import assert from 'node:assert'

import { server } from "../app.ts";
import { makeTask } from "../factories/make-tasks.ts";
import { makeUser } from "../factories/make-user.ts";

 
    test.it(" get tesks", async ()=>{
    
            await server.ready();

            const user = await makeUser();

            
        const task = await makeTask({
            description: "task 1",
            priority: 'low',
            status: 'pendente',
            title: "tarefa teste 1",
            userId: user.id
         })

         assert.strictEqual(task.description, "task 1")

    })
