import { hash } from "bcrypt";
// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
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
  it("should be able to create a new category", async () => {
    const responseToken = await request(app)
      .post("/session/create-session")
      .send({
        email: "admin@rentx.com.br",
        password: "admin",
      });
    const { token } = responseToken.body;
    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Description test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.status).toBe(201);
  });
  it("should not be able to create a new category with a name that already existsd", async () => {
    const responseToken = await request(app)
      .post("/session/create-session")
      .send({
        email: "admin@rentx.com.br",
        password: "admin",
      });
    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Description test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.status).toBe(400);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
