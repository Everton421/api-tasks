
    import fastify from "fastify"
declare module "fastify" {
    interface FastifyRequest { 
        user?: {
        sub: string
        role: 'suport'|'developer'
        }
    }
}