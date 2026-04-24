import conexao from "../config/db.js";

export const listarAlunos = async (req, res) => {
  let conn;
  try {
    conn = await conexao.getConnection();

    const [dados] = await conn.query(`
      SELECT a.*, t.nome AS turma
      FROM alunos a
      LEFT JOIN turmas t ON a.turma_id = t.id
    `);

    res.json(dados);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao listar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};

export const criarAluno = async (req, res) => {
  let conn;
  try {
    const { nome, cpf } = req.body;

    if (!nome || !cpf) {
      return res.status(400).json({ msg: "Nome e CPF obrigatórios" });
    }

    conn = await conexao.getConnection();

    const [result] = await conn.query(
      `INSERT INTO alunos (nome,cpf,email,telefone,data_nascimento,turma_id,status)
       VALUES (?,?,?,?,?,?,?)`,
      Object.values(req.body)
    );

    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao criar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};

export const atualizarAluno = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;

    conn = await conexao.getConnection();

    await conn.query(
      `UPDATE alunos SET nome=?,cpf=?,email=?,telefone=?,data_nascimento=?,turma_id=?,status=? WHERE id=?`,
      [...Object.values(req.body), id]
    );

    res.json({ msg: "Atualizado" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};

export const deletarAluno = async (req, res) => {
  let conn;
  try {
    conn = await conexao.getConnection();
    await conn.query("DELETE FROM alunos WHERE id=?", [req.params.id]);
    res.json({ msg: "Deletado" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};