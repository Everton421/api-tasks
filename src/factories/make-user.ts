import { randomUUID, type UUID } from 'node:crypto'
import { db } from '../database/client.ts'
import { users } from '../database/schema.ts'
import { faker, fakerKA_GE } from '@faker-js/faker'

type user = {
    id:UUID
     name: string
     email: string
     password: string
     role:  'suport' |'developer'
}

export async function makeUser(user?:user  ): Promise< user >{
        const resultInsertUser = await db.insert(users).values(
            {
                email:  user?.email ?? faker.internet.email(),
                name: user?.name ?? faker.person.fullName(),
                password: user?.password ?? faker.internet.password(),
                id: user?.id ?? randomUUID(),
                role: user?.role ?? 'suport'
            }
        ).returning()

        return resultInsertUser[0] as user;
} 