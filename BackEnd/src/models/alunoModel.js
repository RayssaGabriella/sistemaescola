import conexao from "../config/db.js";

export const listar = async () => {
  const [r] = await conexao.query(`
    SELECT a.*, t.nome AS turma
    FROM alunos a
    LEFT JOIN turmas t ON a.turma_id = t.id
  `);
  return r;
};

export const criar = async (d) => {
  const { nome, cpf, email, telefone, data_nascimento, turma_id, status } = d;

  const [r] = await conexao.query(
    `INSERT INTO alunos 
    (nome,cpf,email,telefone,data_nascimento,turma_id,status)
    VALUES (?,?,?,?,?,?,?)`,
    [nome, cpf, email, telefone, data_nascimento, turma_id, status]
  );

  return { id: r.insertId, ...d };
};

export const atualizar = async (id, d) => {
  const { nome, cpf, email, telefone, data_nascimento, turma_id, status } = d;

  await conexao.query(
    `UPDATE alunos SET nome=?,cpf=?,email=?,telefone=?,data_nascimento=?,turma_id=?,status=? WHERE id=?`,
    [nome, cpf, email, telefone, data_nascimento, turma_id, status, id]
  );
};

export const deletar = async (id) => {
  await conexao.query("DELETE FROM alunos WHERE id=?", [id]);
};