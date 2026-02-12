
import request from 'supertest'
import test, { describe } from 'node:test'
import assert from 'node:assert'
import { makeUser } from '../factories/make-user.ts'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'
import { server } from '../app.ts'
import { generateJwt } from '../hooks/generate-jwt.ts'

test.it(" [ TEST CREATE USER ] ", async ()=>{
                   await server.ready()

    const  email = faker.internet.email({ firstName: "teste",lastName:'intersig', provider:'gmail' });
    const  name = faker.person.firstName();
    const  password = faker.internet.password();
    const  role ='suport'; 
    const id = randomUUID();

                 const user = await makeUser()
                   const token = generateJwt(user);

        const newUser = {
                email ,
                name,
                password,
                role,
                id
            } as any

        const response = await request(server.server)
                    .post('/user')
                    .send(newUser)
                    .set('authorization', token )       

                    assert.ok( typeof newUser.id );
})