import jwt from 'jsonwebtoken';
import { type UUID  } from 'node:crypto'

type user = {
    id: UUID
     name: string
     email: string
     password: string
     role:  'suport' |'developer'
}

export function generateJwt(user: user){

            if(!process.env.JWT_SECRET ) throw new Error("JWt_SECRET is not defined");

                const token = jwt.sign({
                    sub: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET
            )
            return token
        }
