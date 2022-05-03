import { hash } from "bcrypt";
// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO public.user (id, name, email, password, is_admin, driver_license, created_at)
     VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, '0123456789', NOW())`
    );
  });
  it("should be able to list all categories", async () => {
    const responseToken = await request(app)
      .post("/session/create-session")
      .send({
        email: "admin@rentx.com.br",
        password: "admin",
      });
    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Description test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest 2",
        description: "Description test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .get("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[1].name).toEqual("Category Supertest 2");
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
