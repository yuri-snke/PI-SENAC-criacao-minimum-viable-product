import con from "../connection.js";

export async function CriarUsuario(usuario) {
  let comando = `INSERT INTO tbl_usuario
                  (nome, email, senha)
                  VALUES (?, ?, ?)`;

  await con.query(comando, [usuario.nome, usuario.email, usuario.senha]);
}

export async function obterUsuarioEmail(usuario) {
  let comando = `select * from tbl_usuario where email = ?`;

  const [linhas] = await con.query(comando, [usuario.email]);

  return linhas;
}
