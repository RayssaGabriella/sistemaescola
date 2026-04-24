import conexao from "../config/db.js";

export const listar = async () => {
  const [r] = await conexao.query("SELECT * FROM professores");
  return r;
};

export const criar = async (d) => {
  const { nome, email, telefone, especialidade } = d;
  const [r] = await conexao.query(
    "INSERT INTO professores (nome,email,telefone,especialidade) VALUES (?,?,?,?)",
    [nome, email, telefone, especialidade]
  );
  return { id: r.insertId, ...d };
};

export const atualizar = async (id, d) => {
  const { nome, email, telefone, especialidade } = d;
  await conexao.query(
    "UPDATE professores SET nome=?,email=?,telefone=?,especialidade=? WHERE id=?",
    [nome, email, telefone, especialidade, id]
  );
};

export const deletar = async (id) => {
  await conexao.query("DELETE FROM professores WHERE id=?", [id]);
};