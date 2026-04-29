import request from "supertest";
import app from "../app.js";

describe("Alunos", () => {

  test("POST /alunos - criar aluno", async () => {

    const email = `aluno${Date.now()}@email.com`;

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
      .post("/alunos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Maria",
        cpf: `${Date.now()}`,
        email: "maria@email.com",
        telefone: "11999999999",
        data_nascimento: "2005-01-01",
        turma_id: 1,
        status: "ativo"
      });

    expect(res.statusCode).toBe(201);
  });

  test("POST /alunos - erro sem nome", async () => {

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
      .post("/alunos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        cpf: `${Date.now()}`
      });

    expect(res.statusCode).toBe(400);
  });

  test("GET /alunos - listar alunos", async () => {

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
      .get("/alunos")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  test("PUT /alunos/:id - atualizar aluno", async () => {

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

    const aluno = await request(app)
      .post("/alunos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Pedro",
        cpf: `${Date.now()}`,
        email: "pedro@email.com",
        telefone: "11999999999",
        data_nascimento: "2004-01-01",
        turma_id: 1,
        status: "ativo"
      });

    const res = await request(app)
      .put(`/alunos/${aluno.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Pedro Atualizado",
        cpf: `${Date.now()}`,
        email: "novo@email.com",
        telefone: "11111111111",
        data_nascimento: "2004-01-01",
        turma_id: 1,
        status: "ativo"
      });

    expect(res.statusCode).toBe(200);
  });

  test("DELETE /alunos/:id - deletar aluno", async () => {

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

    const aluno = await request(app)
      .post("/alunos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Carlos",
        cpf: `${Date.now()}`,
        email: "carlos@email.com",
        telefone: "11999999999",
        data_nascimento: "2003-01-01",
        turma_id: 1,
        status: "ativo"
      });

    const res = await request(app)
      .delete(`/alunos/${aluno.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});