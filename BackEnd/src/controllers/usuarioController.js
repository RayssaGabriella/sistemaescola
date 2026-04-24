import conexao from "../config/db.js";
import bcrypt from "bcryptjs";

export const listarUsuarios = async (req, res) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [usuarios] = await conn.query(`
      SELECT id, nome, email, perfil, criado_em FROM usuarios
    `);

    res.json(usuarios);
  } catch (error) {
    res.status(500).json({
      msg: "Erro ao listar usuarios",
      erro: error.message
    });
  } finally {
    if (conn) conn.release();
  }
};

export const criarUsuario = async (req, res) => {
  let conn;

  try {
    const { nome, email, senha, perfil } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ msg: "Campos obrigatórios" });
    }

    conn = await conexao.getConnection();

    const senhaHash = await bcrypt.hash(senha, 10);

    const [result] = await conn.query(
      `INSERT INTO usuarios (nome, email, senha, perfil)
       VALUES (?, ?, ?, ?)`,
      [nome, email, senhaHash, perfil || "admin"]
    );

    res.status(201).json({
      id: result.insertId,
      nome,
      email,
      perfil
    });
  } catch (error) {
    res.status(500).json({
      msg: "Erro ao criar usuario",
      erro: error.message
    });
  } finally {
    if (conn) conn.release();
  }
};

export const atualizarUsuario = async (req, res) => {
  let conn;

  try {
    const { id } = req.params;
    const { nome, email, perfil } = req.body;

    conn = await conexao.getConnection();

    await conn.query(
      `UPDATE usuarios SET nome=?, email=?, perfil=? WHERE id=?`,
      [nome, email, perfil, id]
    );

    res.json({ msg: "Usuário atualizado" });
  } catch (error) {
    res.status(500).json({
      msg: "Erro ao atualizar usuario",
      erro: error.message
    });
  } finally {
    if (conn) conn.release();
  }
};

export const deletarUsuario = async (req, res) => {
  let conn;

  try {
    const { id } = req.params;

    conn = await conexao.getConnection();

    await conn.query(`DELETE FROM usuarios WHERE id=?`, [id]);

    res.json({ msg: "Usuário deletado" });
  } catch (error) {
    res.status(500).json({
      msg: "Erro ao deletar usuario",
      erro: error.message
    });
  } finally {
    if (conn) conn.release();
  }
};