import conexao from "../config/db.js";

export const listarProfessores = async (req, res) => {
  let conn;
  try {
    conn = await conexao.getConnection();
    const [dados] = await conn.query("SELECT * FROM professores");
    res.json(dados);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao listar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};

export const criarProfessor = async (req, res) => {
  let conn;
  try {
    const { nome, email, telefone, especialidade } = req.body;

    if (!nome) {
      return res.status(400).json({ msg: "Nome obrigatório" });
    }

    conn = await conexao.getConnection();

    const [result] = await conn.query(
      "INSERT INTO professores (nome,email,telefone,especialidade) VALUES (?,?,?,?)",
      [nome, email, telefone, especialidade]
    );

    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao criar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};

export const atualizarProfessor = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { nome, email, telefone, especialidade } = req.body;

    conn = await conexao.getConnection();

    await conn.query(
      "UPDATE professores SET nome=?,email=?,telefone=?,especialidade=? WHERE id=?",
      [nome, email, telefone, especialidade, id]
    );

    res.json({ msg: "Atualizado" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};

export const deletarProfessor = async (req, res) => {
  let conn;
  try {
    conn = await conexao.getConnection();
    await conn.query("DELETE FROM professores WHERE id=?", [req.params.id]);
    res.json({ msg: "Deletado" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};