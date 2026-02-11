import test from 'node:test'
import assert from 'node:assert'
import { makeTask } from '../factories/make-tasks.ts'
import { faker } from '@faker-js/faker'
import { makeUser } from '../factories/make-user.ts'
import { server } from '../app.ts'
import request  from 'supertest'
import { generateJwt } from '../hooks/generate-jwt.ts'


test.it(" [ TESTE ] Create tasks  ", async ()=>{

    await server.ready()

    const user = await makeUser();
    const token = generateJwt(user);

    const description = faker.lorem.lines({min:1, max:1 })
    const title = faker.lorem.lines({min:1, max:1})
    const status = 'pendente';
    const priority = 'low';
 
     

     const response = await request(server.server)
     .post(`/tasks`).send( { priority, status, title, description } ).set('authorization', `${token}`);

     assert.strictEqual(response.status, 201 );




})