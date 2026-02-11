
import request from 'supertest'
import test, { describe } from 'node:test'
import assert from 'node:assert'
import { makeUser } from '../factories/make-user.ts'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

test.it(" [ TEST CREATE USER ] ", async ()=>{

    const  email = faker.internet.email({ firstName: "teste",lastName:'intersig', provider:'gmail' });
    const  name = faker.person.firstName();
    const  password = faker.internet.password();
    const  role ='suport'; 
    const id = randomUUID();

        const newUser = {
                email,
                name,
                password,
                role,
                id
            } as any

                 const user = await makeUser(newUser)
                   assert.strictEqual(user.id, id );

                 

})