import conexao from "../config/db.js";

export const listar = async () => {
  const [r] = await conexao.query("SELECT * FROM disciplinas");
  return r;
};

export const criar = async (d) => {
  const { nome, carga_horaria } = d;
  const [r] = await conexao.query(
    "INSERT INTO disciplinas (nome,carga_horaria) VALUES (?,?)",
    [nome, carga_horaria]
  );
  return { id: r.insertId, ...d };
};

export const atualizar = async (id, d) => {
  const { nome, carga_horaria } = d;
  await conexao.query(
    "UPDATE disciplinas SET nome=?,carga_horaria=? WHERE id=?",
    [nome, carga_horaria, id]
  );
};

export const deletar = async (id) => {
  await conexao.query("DELETE FROM disciplinas WHERE id=?", [id]);
};