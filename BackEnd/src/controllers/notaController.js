import conexao from "../config/db.js";

export const listarNotas = async (req, res) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [dados] = await conn.query(`
      SELECT 
        n.id,
        a.nome AS aluno,
        d.nome AS disciplina,
        n.nota,
        n.bimestre,
        n.observacao
      FROM notas n
      INNER JOIN alunos a 
        ON n.aluno_id = a.id
      INNER JOIN disciplinas d 
        ON n.disciplina_id = d.id
    `);

    res.json(dados);

  } catch (error) {
    res.status(500).json({
      msg: "Erro ao listar",
      erro: error.message
    });
  } finally {
    if (conn) conn.release();
  }
};

export const criarNota = async (req, res) => {
  let conn;

  try {
    const {
      aluno_id,
      disciplina_id,
      nota,
      bimestre,
      observacao
    } = req.body;

    if (!aluno_id || !disciplina_id || !nota || !bimestre) {
      return res.status(400).json({
        msg: "Dados obrigatórios"
      });
    }

    conn = await conexao.getConnection();

    const [result] = await conn.query(
      `
      INSERT INTO notas
      (aluno_id, disciplina_id, nota, bimestre, observacao)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        aluno_id,
        disciplina_id,
        nota,
        bimestre,
        observacao || null
      ]
    );

    res.status(201).json({
      msg: "Nota criada com sucesso",
      id: result.insertId
    });

  } catch (error) {
    res.status(500).json({
      msg: "Erro ao criar",
      erro: error.message
    });
  } finally {
    if (conn) conn.release();
  }
};

export const atualizarNota = async (req, res) => {
  let conn;

  try {
    const { id } = req.params;

    const {
      aluno_id,
      disciplina_id,
      nota,
      bimestre,
      observacao
    } = req.body;

    conn = await conexao.getConnection();

    await conn.query(
      `
      UPDATE notas
      SET
        aluno_id = ?,
        disciplina_id = ?,
        nota = ?,
        bimestre = ?,
        observacao = ?
      WHERE id = ?
      `,
      [
        aluno_id,
        disciplina_id,
        nota,
        bimestre,
        observacao || null,
        id
      ]
    );

    res.json({
      msg: "Nota atualizada com sucesso"
    });

  } catch (error) {
    res.status(500).json({
      msg: "Erro ao atualizar",
      erro: error.message
    });
  } finally {
    if (conn) conn.release();
  }
};

export const deletarNota = async (req, res) => {
  let conn;

  try {
    const { id } = req.params;

    conn = await conexao.getConnection();

    await conn.query(
      "DELETE FROM notas WHERE id = ?",
      [id]
    );

    res.json({
      msg: "Nota deletada com sucesso"
    });

  } catch (error) {
    res.status(500).json({
      msg: "Erro ao deletar",
      erro: error.message
    });
  } finally {
    if (conn) conn.release();
  }
};

export const calcularMediaAluno = async (req, res) => {
  let conn;

  try {
    const { aluno_id } = req.params;

    conn = await conexao.getConnection();

    const [dados] = await conn.query(
      `
      SELECT
        a.nome AS aluno,
        ROUND(AVG(n.nota), 2) AS media,
        CASE
          WHEN AVG(n.nota) >= 7
          THEN 'Aprovado'
          ELSE 'Reprovado'
        END AS situacao
      FROM notas n
      INNER JOIN alunos a
        ON n.aluno_id = a.id
      WHERE aluno_id = ?
      GROUP BY a.nome
      `,
      [aluno_id]
    );

    res.json(dados);

  } catch (error) {
    res.status(500).json({
      msg: "Erro ao calcular média",
      erro: error.message
    });
  } finally {
    if (conn) conn.release();
  }
};