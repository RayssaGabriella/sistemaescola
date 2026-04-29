import request from "supertest";
import app from "../app.js";

describe("Auth", () => {

  test("POST /auth/registrar - registrar usuário", async () => {

    const res = await request(app)
      .post("/auth/registrar")
      .send({
        nome: "Teste",
        email: `teste${Date.now()}@email.com`,
        senha: "123456"
      });

    expect(res.statusCode).toBe(201);
  });

  test("POST /auth/registrar - erro sem email", async () => {

    const res = await request(app)
      .post("/auth/registrar")
      .send({
        nome: "Teste",
        senha: "123456"
      });

    expect(res.statusCode).toBe(400);
  });

  test("POST /auth/login - login usuário", async () => {

    const email = `login${Date.now()}@email.com`;

    await request(app)
      .post("/auth/registrar")
      .send({
        nome: "Login",
        email,
        senha: "123456"
      });

    const res = await request(app)
      .post("/auth/login")
      .send({
        email,
        senha: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("POST /auth/login - senha incorreta", async () => {

    const email = `erro${Date.now()}@email.com`;

    await request(app)
      .post("/auth/registrar")
      .send({
        nome: "Erro",
        email,
        senha: "123456"
      });

    const res = await request(app)
      .post("/auth/login")
      .send({
        email,
        senha: "errada"
      });

    expect(res.statusCode).toBe(401);
  });

});