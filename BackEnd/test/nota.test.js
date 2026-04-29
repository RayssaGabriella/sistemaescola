import request from "supertest";
import app from "../app.js";

describe("Notas", () => {

  test("POST /notas - criar nota", async () => {

    const email = `nota${Date.now()}@email.com`;

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
      .post("/notas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        aluno_id: 1,
        disciplina_id: 1,
        nota: 8,
        bimestre: "1",
        observacao: "Boa nota"
      });

    expect(res.statusCode).toBe(201);
  });

  test("POST /notas - erro sem nota", async () => {

    const email = `erro${Date.now()}@email.com`;

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
      .post("/notas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        aluno_id: 1,
        disciplina_id: 1,
        bimestre: "1"
      });

    expect(res.statusCode).toBe(400);
  });

  test("GET /notas - listar notas", async () => {

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
      .get("/notas")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  test("PUT /notas/:id - atualizar nota", async () => {

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

    const nota = await request(app)
      .post("/notas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        aluno_id: 1,
        disciplina_id: 1,
        nota: 7,
        bimestre: "1",
        observacao: "Inicial"
      });

    const res = await request(app)
      .put(`/notas/${nota.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        aluno_id: 1,
        disciplina_id: 1,
        nota: 9,
        bimestre: "2",
        observacao: "Atualizada"
      });

    expect(res.statusCode).toBe(200);
  });

  test("DELETE /notas/:id - deletar nota", async () => {

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

    const nota = await request(app)
      .post("/notas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        aluno_id: 1,
        disciplina_id: 1,
        nota: 6,
        bimestre: "1",
        observacao: "Excluir"
      });

    const res = await request(app)
      .delete(`/notas/${nota.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  test("GET /notas/media/:aluno_id - calcular média", async () => {

    const email = `media${Date.now()}@email.com`;

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
      .get("/notas/media/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});