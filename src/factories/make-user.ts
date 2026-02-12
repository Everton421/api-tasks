import { randomUUID, type UUID } from 'node:crypto'
import { db } from '../database/client.ts'
import { users } from '../database/schema.ts'
import { faker   } from '@faker-js/faker'
import { hash } from 'argon2'

type user = {
    id: UUID
     name: string
     email: string
     password: string
     role:  'suport' |'developer'
}

export async function makeUser(user?:user  ) {

            let pass =    user?.password  ?? faker.internet.password()

            const password = await   hash(pass);


            const resultInsertUser = await db.insert(users).values(
            {
                email:  user?.email ?? faker.internet.email(),
                name: user?.name ?? faker.person.fullName(),
                password: password,
                id: user?.id ?? randomUUID(),
                role: user?.role ?? 'suport'
            }
        ).returning()

        return resultInsertUser[0] as user   ;
} 