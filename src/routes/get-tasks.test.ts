import test from "node:test";
import assert from 'node:assert'
import request from 'supertest'

import { server } from "../app.ts";
import { makeTask } from "../factories/make-tasks.ts";
import { makeUser } from "../factories/make-user.ts";
import { faker } from "@faker-js/faker";
import { generateJwt } from "../hooks/generate-jwt.ts";

 
    test.it(" get tesks", async ()=>{
    
            await server.ready();

            const user = await makeUser()   ;

                const title = faker.lorem.lines({min:1, max :1});
                const description = faker.lorem.lines({min:1 , max:2});

                const token = generateJwt(user)  ;

        const task = await makeTask({
            description: description,
            priority: 'low',
            status: 'pendente',
            title: title,
            userId: user.id
         })
         

         const response = await request(server.server)
         .get(`/tasks?search=${title}`).set('authorization', `${token}` );


         assert.strictEqual(response.status, 200);

          
         assert.strictEqual( response.body, 
                {
                   tasks: [
                        {
                         id: task.id,
                          title: task.title,
                          description: task.description,
                          status: task.status,
                          priority: task.priority,
                          userId: task.userId,
                          createdAt: task.createdAt.toISOString(),
                          updatedAt: task.updatedAt.toISOString()
                        }   
                    ],
                    total: 1

                }
         )
            

         
    })
