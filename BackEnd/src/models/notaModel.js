import conexao from "../config/db.js";

export const listar = async () => {
  const [r] = await conexao.query(`
    SELECT n.id, a.nome AS aluno, d.nome AS disciplina,
           n.nota, n.bimestre, n.observacao
    FROM notas n
    INNER JOIN alunos a ON n.aluno_id = a.id
    INNER JOIN disciplinas d ON n.disciplina_id = d.id
  `);
  return r;
};

export const criar = async (d) => {
  const { aluno_id, disciplina_id, nota, bimestre, observacao } = d;

  const [r] = await conexao.query(
    "INSERT INTO notas (aluno_id,disciplina_id,nota,bimestre,observacao) VALUES (?,?,?,?,?)",
    [aluno_id, disciplina_id, nota, bimestre, observacao]
  );

  return { id: r.insertId, ...d };
};

export const atualizar = async (id, d) => {
  const { aluno_id, disciplina_id, nota, bimestre, observacao } = d;

  await conexao.query(
    "UPDATE notas SET aluno_id=?,disciplina_id=?,nota=?,bimestre=?,observacao=? WHERE id=?",
    [aluno_id, disciplina_id, nota, bimestre, observacao, id]
  );
};

export const deletar = async (id) => {
  await conexao.query("DELETE FROM notas WHERE id=?", [id]);
};