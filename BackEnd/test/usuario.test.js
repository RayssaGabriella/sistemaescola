import request from "supertest";
import app from "../app.js";

describe("Usuarios", () => {

  test("POST /usuarios - criar usuário", async () => {

    const emailAdmin = `admin${Date.now()}@email.com`;

    await request(app)
      .post("/auth/registrar")
      .send({
        nome: "Admin",
        email: emailAdmin,
        senha: "123456"
      });

    const login = await request(app)
      .post("/auth/login")
      .send({
        email: emailAdmin,
        senha: "123456"
      });

    const token = login.body.token;

    const res = await request(app)
      .post("/usuarios")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Novo Usuario",
        email: `novo${Date.now()}@email.com`,
        senha: "123456",
        perfil: "admin"
      });

    expect(res.statusCode).toBe(201);
  });

  test("POST /usuarios - erro campos obrigatórios", async () => {

    const emailAdmin = `erro${Date.now()}@email.com`;

    await request(app)
      .post("/auth/registrar")
      .send({
        nome: "Admin",
        email: emailAdmin,
        senha: "123456"
      });

    const login = await request(app)
      .post("/auth/login")
      .send({
        email: emailAdmin,
        senha: "123456"
      });

    const token = login.body.token;

    const res = await request(app)
      .post("/usuarios")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Sem Email"
      });

    expect(res.statusCode).toBe(400);
  });

  test("GET /usuarios - listar usuários", async () => {

    const emailAdmin = `listar${Date.now()}@email.com`;

    await request(app)
      .post("/auth/registrar")
      .send({
        nome: "Admin",
        email: emailAdmin,
        senha: "123456"
      });

    const login = await request(app)
      .post("/auth/login")
      .send({
        email: emailAdmin,
        senha: "123456"
      });

    const token = login.body.token;

    const res = await request(app)
      .get("/usuarios")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  test("PUT /usuarios/:id - atualizar usuário", async () => {

    const emailAdmin = `put${Date.now()}@email.com`;

    await request(app)
      .post("/auth/registrar")
      .send({
        nome: "Admin",
        email: emailAdmin,
        senha: "123456"
      });

    const login = await request(app)
      .post("/auth/login")
      .send({
        email: emailAdmin,
        senha: "123456"
      });

    const token = login.body.token;

    const usuario = await request(app)
      .post("/usuarios")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Usuario",
        email: `usuario${Date.now()}@email.com`,
        senha: "123456",
        perfil: "admin"
      });

    const res = await request(app)
      .put(`/usuarios/${usuario.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Usuario Atualizado",
        email: `novo${Date.now()}@email.com`,
        perfil: "admin"
      });

    expect(res.statusCode).toBe(200);
  });

  test("DELETE /usuarios/:id - deletar usuário", async () => {

    const emailAdmin = `delete${Date.now()}@email.com`;

    await request(app)
      .post("/auth/registrar")
      .send({
        nome: "Admin",
        email: emailAdmin,
        senha: "123456"
      });

    const login = await request(app)
      .post("/auth/login")
      .send({
        email: emailAdmin,
        senha: "123456"
      });

    const token = login.body.token;

    const usuario = await request(app)
      .post("/usuarios")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Usuario Delete",
        email: `deleteuser${Date.now()}@email.com`,
        senha: "123456",
        perfil: "admin"
      });

    const res = await request(app)
      .delete(`/usuarios/${usuario.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});