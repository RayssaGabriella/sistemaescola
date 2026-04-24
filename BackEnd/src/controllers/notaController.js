import conexao from "../config/db.js";

export const listarNotas = async (req, res) => {
  let conn;
  try {
    conn = await conexao.getConnection();

    const [dados] = await conn.query(`
      SELECT n.id, a.nome AS aluno, d.nome AS disciplina,
             n.nota, n.bimestre, n.observacao
      FROM notas n
      INNER JOIN alunos a ON n.aluno_id = a.id
      INNER JOIN disciplinas d ON n.disciplina_id = d.id
    `);

    res.json(dados);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao listar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};

export const criarNota = async (req, res) => {
  let conn;
  try {
    const { aluno_id, disciplina_id, nota, bimestre } = req.body;

    if (!aluno_id || !disciplina_id || !nota || !bimestre) {
      return res.status(400).json({ msg: "Dados obrigatórios" });
    }

    conn = await conexao.getConnection();

    const [result] = await conn.query(
      "INSERT INTO notas (aluno_id,disciplina_id,nota,bimestre,observacao) VALUES (?,?,?,?,?)",
      Object.values(req.body)
    );

    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao criar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};

export const atualizarNota = async (req, res) => {
  let conn;
  try {
    conn = await conexao.getConnection();

    await conn.query(
      "UPDATE notas SET aluno_id=?,disciplina_id=?,nota=?,bimestre=?,observacao=? WHERE id=?",
      [...Object.values(req.body), req.params.id]
    );

    res.json({ msg: "Atualizado" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};

export const deletarNota = async (req, res) => {
  let conn;
  try {
    conn = await conexao.getConnection();
    await conn.query("DELETE FROM notas WHERE id=?", [req.params.id]);
    res.json({ msg: "Deletado" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar", erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};