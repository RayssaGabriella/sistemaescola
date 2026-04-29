import request from "supertest";
import app from "../app.js";

describe("Disciplinas", () => {

  test("POST /disciplinas - criar disciplina", async () => {

    const email = `disc${Date.now()}@email.com`;

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
      .post("/disciplinas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Matemática",
        carga_horaria: 80
      });

    expect(res.statusCode).toBe(201);
  });

  test("POST /disciplinas - erro sem carga horaria", async () => {

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
      .post("/disciplinas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "História"
      });

    expect(res.statusCode).toBe(400);
  });

  test("GET /disciplinas - listar disciplinas", async () => {

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
      .get("/disciplinas")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  test("PUT /disciplinas/:id - atualizar disciplina", async () => {

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

    const disciplina = await request(app)
      .post("/disciplinas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Português",
        carga_horaria: 60
      });

    const res = await request(app)
      .put(`/disciplinas/${disciplina.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Português Atualizado",
        carga_horaria: 100
      });

    expect(res.statusCode).toBe(200);
  });

  test("DELETE /disciplinas/:id - deletar disciplina", async () => {

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

    const disciplina = await request(app)
      .post("/disciplinas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Geografia",
        carga_horaria: 70
      });

    const res = await request(app)
      .delete(`/disciplinas/${disciplina.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});