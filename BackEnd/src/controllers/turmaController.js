import conexao from "../config/db.js";

export const listarTurmas = async (req, res) => {
  let conn;
  try {
    conn = await conexao.getConnection();

    const [dados] = await conn.query(`
      SELECT t.*, p.nome AS professor
      FROM turmas t
      LEFT JOIN professores p ON t.professor_id = p.id
    `);

    res.json(dados);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao listar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};

export const criarTurma = async (req, res) => {
  let conn;
  try {
    const { nome, ano_letivo, professor_id } = req.body;

    if (!nome || !ano_letivo) {
      return res.status(400).json({ msg: "Dados obrigatórios" });
    }

    conn = await conexao.getConnection();

    const [result] = await conn.query(
      "INSERT INTO turmas (nome,ano_letivo,professor_id) VALUES (?,?,?)",
      [nome, ano_letivo, professor_id]
    );

    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao criar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};

export const atualizarTurma = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { nome, ano_letivo, professor_id } = req.body;

    conn = await conexao.getConnection();

    await conn.query(
      "UPDATE turmas SET nome=?,ano_letivo=?,professor_id=? WHERE id=?",
      [nome, ano_letivo, professor_id, id]
    );

    res.json({ msg: "Atualizado" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};

export const deletarTurma = async (req, res) => {
  let conn;
  try {
    conn = await conexao.getConnection();
    await conn.query("DELETE FROM turmas WHERE id=?", [req.params.id]);
    res.json({ msg: "Deletado" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};