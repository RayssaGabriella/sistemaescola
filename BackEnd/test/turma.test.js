import request from "supertest";
import app from "../app.js";

describe("Turmas", () => {

  test("POST /turmas - criar turma", async () => {

    const email = `turma${Date.now()}@email.com`;

    await request(app)
      .post("/auth/registrar")
      .send({
        nome: "Admin",
        email,
        senha: "123456"
      });

    const login = await request(app)
      .post("/auth/login")
      .send({
        email,
        senha: "123456"
      });

    const token = login.body.token;

    const res = await request(app)
      .post("/turmas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Turma A",
        ano_letivo: 2025,
        professor_id: 1
      });

    expect(res.statusCode).toBe(201);
  });

  test("GET /turmas - listar turmas", async () => {

    const email = `listar${Date.now()}@email.com`;

    await request(app)
      .post("/auth/registrar")
      .send({
        nome: "Admin",
        email,
        senha: "123456"
      });

    const login = await request(app)
      .post("/auth/login")
      .send({
        email,
        senha: "123456"
      });

    const token = login.body.token;

    const res = await request(app)
      .get("/turmas")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  test("PUT /turmas/:id - atualizar turma", async () => {

    const email = `put${Date.now()}@email.com`;

    await request(app)
      .post("/auth/registrar")
      .send({
        nome: "Admin",
        email,
        senha: "123456"
      });

    const login = await request(app)
      .post("/auth/login")
      .send({
        email,
        senha: "123456"
      });

    const token = login.body.token;

    const turma = await request(app)
      .post("/turmas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Turma B",
        ano_letivo: 2025,
        professor_id: 1
      });

    const res = await request(app)
      .put(`/turmas/${turma.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Turma Atualizada",
        ano_letivo: 2026,
        professor_id: 1
      });

    expect(res.statusCode).toBe(200);
  });

  test("DELETE /turmas/:id - deletar turma", async () => {

    const email = `delete${Date.now()}@email.com`;

    await request(app)
      .post("/auth/registrar")
      .send({
        nome: "Admin",
        email,
        senha: "123456"
      });

    const login = await request(app)
      .post("/auth/login")
      .send({
        email,
        senha: "123456"
      });

    const token = login.body.token;

    const turma = await request(app)
      .post("/turmas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Turma Delete",
        ano_letivo: 2025,
        professor_id: 1
      });

    const res = await request(app)
      .delete(`/turmas/${turma.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});