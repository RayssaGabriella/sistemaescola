import conexao from "../config/db.js";

export const listar = async () => {
  const [r] = await conexao.query("SELECT id,nome,email,perfil,criado_em FROM usuarios");
  return r;
};

export const criar = async (d) => {
  const { nome, email, senha, perfil } = d;
  const [r] = await conexao.query(
    "INSERT INTO usuarios (nome,email,senha,perfil) VALUES (?,?,?,?)",
    [nome, email, senha, perfil]
  );
  return { id: r.insertId, ...d };
};

export const atualizar = async (id, d) => {
  const { nome, email, perfil } = d;
  await conexao.query(
    "UPDATE usuarios SET nome=?,email=?,perfil=? WHERE id=?",
    [nome, email, perfil, id]
  );
};

export const deletar = async (id) => {
  await conexao.query("DELETE FROM usuarios WHERE id=?", [id]);
};