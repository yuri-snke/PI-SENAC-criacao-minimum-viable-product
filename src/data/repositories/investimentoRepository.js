import con from "../connection.js";

export async function CriarInvestimentos(usuario) {
  let comando = `INSERT INTO tbl_investimento
                  (nome, email, senha)
                  VALUES (?, ?, ?)`;

  await con.query(comando, [usuario.nome, usuario.email, usuario.senha]);
}

export async function buscaInvestimentos(usuarioId) {
  let comando = `select * from tbl_investimento where usuario_id = ?`;

  const [linhas] = await con.query(comando, [usuarioId]);

  return linhas;
}