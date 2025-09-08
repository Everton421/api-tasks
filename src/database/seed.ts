import { title } from "process";
import { db } from "./client.ts";
import { tasks, users } from "./schema.ts";
import {   randomUUID } from 'node:crypto'
import { fakerPT_BR as faker }  from '@faker-js/faker'  
import { hash } from 'argon2'

async function seed(){
    

    const password = await hash("123456")

    const usersExample = await db.insert(users ).values([
        { role: 'suport' , email: faker.internet.email(), name:faker.person.fullName(), password: password , id: randomUUID()}
    ]).returning()

    const taskExample = await db.insert( tasks ).values( 
        [
            { userId: usersExample[0].id, title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'low'},
            { userId: usersExample[0].id, title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'high'},
            { userId: usersExample[0].id, title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'medium' },
            { userId: usersExample[0].id, title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'low'},
            { userId: usersExample[0].id, title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'low'},
            { userId: usersExample[0].id, title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'low'},
            { userId: usersExample[0].id, title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'low'},
            { userId: usersExample[0].id, title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'low'},
            { userId: usersExample[0].id, title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'low'},
            { userId: usersExample[0].id, title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'low'}

        
        ]
     ).returning()
}

seed().then(()=>{}).catch(console.log).finally(()=> process.exit())