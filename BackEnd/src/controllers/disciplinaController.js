import conexao from "../config/db.js";

export const listarDisciplinas = async (req, res) => {
  let conn;
  try {
    conn = await conexao.getConnection();
    const [dados] = await conn.query("SELECT * FROM disciplinas");
    res.json(dados);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao listar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};

export const criarDisciplina = async (req, res) => {
  let conn;
  try {
    const { nome, carga_horaria } = req.body;

    if (!nome || !carga_horaria) {
      return res.status(400).json({ msg: "Dados obrigatórios" });
    }

    conn = await conexao.getConnection();

    const [result] = await conn.query(
      "INSERT INTO disciplinas (nome,carga_horaria) VALUES (?,?)",
      [nome, carga_horaria]
    );

    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao criar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};

export const atualizarDisciplina = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { nome, carga_horaria } = req.body;

    conn = await conexao.getConnection();

    await conn.query(
      "UPDATE disciplinas SET nome=?,carga_horaria=? WHERE id=?",
      [nome, carga_horaria, id]
    );

    res.json({ msg: "Atualizado" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};

export const deletarDisciplina = async (req, res) => {
  let conn;
  try {
    conn = await conexao.getConnection();
    await conn.query("DELETE FROM disciplinas WHERE id=?", [req.params.id]);
    res.json({ msg: "Deletado" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};