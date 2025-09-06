import { title } from "process";
import { db } from "./client.ts";
import { tasks } from "./schema.ts";

import { fakerPT_BR as faker }  from '@faker-js/faker'  

async function seed(){
    
    const taskExample = await db.insert( tasks ).values( 
        [
            { title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'low'},
            { title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'high'},
            { title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'medium' },
            { title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'low'},
            { title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'low'},
            { title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'low'},
            { title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'low'},
            { title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'low'},
            { title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'low'},
            { title: faker.lorem.words(4), description: faker.lorem.words(4), priority:'low'}

        
        ]
     ).returning()
}

seed().then(()=>{}).catch(console.log).finally(()=> process.exit())