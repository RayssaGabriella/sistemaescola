import conexao from "../config/db.js";

export const listar = async () => {
  const [r] = await conexao.query(`
    SELECT t.*, p.nome AS professor
    FROM turmas t
    LEFT JOIN professores p ON t.professor_id = p.id
  `);
  return r;
};

export const criar = async (d) => {
  const { nome, ano_letivo, professor_id } = d;
  const [r] = await conexao.query(
    "INSERT INTO turmas (nome,ano_letivo,professor_id) VALUES (?,?,?)",
    [nome, ano_letivo, professor_id]
  );
  return { id: r.insertId, ...d };
};

export const atualizar = async (id, d) => {
  const { nome, ano_letivo, professor_id } = d;
  await conexao.query(
    "UPDATE turmas SET nome=?,ano_letivo=?,professor_id=? WHERE id=?",
    [nome, ano_letivo, professor_id, id]
  );
};

export const deletar = async (id) => {
  await conexao.query("DELETE FROM turmas WHERE id=?", [id]);
};