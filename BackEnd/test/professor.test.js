import request from "supertest";
import app from "../app.js";

describe("Professores", () => {

  test("POST /professores - criar professor", async () => {

    const email = `prof${Date.now()}@email.com`;

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
      .post("/professores")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "João",
        email: "joao@email.com",
        telefone: "11999999999",
        especialidade: "Matemática"
      });

    expect(res.statusCode).toBe(201);
  });

  test("POST /professores - erro sem nome", async () => {

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
      .post("/professores")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "teste@email.com"
      });

    expect(res.statusCode).toBe(400);
  });

  test("GET /professores - listar professores", async () => {

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
      .get("/professores")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  test("PUT /professores/:id - atualizar professor", async () => {

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

    const professor = await request(app)
      .post("/professores")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Carlos",
        email: "carlos@email.com",
        telefone: "11999999999",
        especialidade: "História"
      });

    const res = await request(app)
      .put(`/professores/${professor.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Carlos Atualizado",
        email: "novo@email.com",
        telefone: "11111111111",
        especialidade: "Física"
      });

    expect(res.statusCode).toBe(200);
  });

  test("DELETE /professores/:id - deletar professor", async () => {

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

    const professor = await request(app)
      .post("/professores")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Pedro",
        email: "pedro@email.com",
        telefone: "11999999999",
        especialidade: "Química"
      });

    const res = await request(app)
      .delete(`/professores/${professor.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});