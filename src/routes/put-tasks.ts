import z from "zod"


export const putTasks = async ( server ) =>{
    server.put('/tasks/:id',{
        schema:{
            tags:['tasks'],
            summary:'Atualizar uma tarefa ',
            params: z.object({
                id: z.uuid()
            }),
            response:{
                200: z.object({
                    task: z.object({
                        id: z.uuid(),
                        title: z.string(),
                        description: z.string(),
                        status: z.enum(["pendente", "em-andamento", "concluido", "cancelado"]),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                    })
                }),
                404: z.null().describe("Tarefa não encontrada") 
            }
        }
    })

}