import { faker } from "@faker-js/faker";
import test, { describe } from "node:test";
import request from "supertest";
import { server } from "../app.ts";
import { makeTask } from "../factories/make-tasks.ts";
import { makeUser } from "../factories/make-user.ts";
import { generateJwt } from "../hooks/generate-jwt.ts";
import  assert  from "node:assert";

test.it("[ TESTE ] Update tasks  ", async () => {

    await server.ready();

    const user = await makeUser();
    const token = generateJwt(user);

    const description = faker.lorem.sentence({ min: 1, max: 1 });
    const title = faker.lorem.sentence({ min: 1, max: 1 });
    const status = 'em-andamento';
    const userId = user.id;
    const priority = 'low';

    let taskId;

            const task = await makeTask(
                {
                    priority,
                    description,
                    title,
                    userId,
                    status,
                }
            )
    const newDescription = faker.lorem.sentence({ min: 1, max: 1 });
    const newTitle = faker.lorem.sentence({ min: 1, max: 1 });
    const newStatus = 'em-andamento';
    const newPriority = 'low';

    const response = await request(server.server)
        .put(`/tasks/${task.id}`)
        .send({
            id:taskId,
              priority: newPriority,
              description: newDescription ,
              title: newTitle,
              userId: userId,
              status: newStatus,
        })
        .set('authorization', token)

        assert.strictEqual(response.status, 200);

        assert.deepEqual(response.body, {
            task:{
                  id:taskId,
                  priority: newPriority,
                  description: newDescription ,
                  title: newTitle,
                  userId: userId,
                  status: newStatus,
            }
        })


})