import con from "../connection.js";

async function CriarUsuario(usuario) {
    let comando = `INSERT INTO tbl_usuario
                  (nome, email, senha)
                  VALUES (?, ?, ?)`;
  
    await con.query(comando, [
      usuario.nome,
      usuario.email,
      usuario.senha
    ]);  
  }

  async function obterUsuarioEmail(usuario) {
    let comando = `select * from tbl_usuario where email = ?`;
  
    const [linhas] = await con.query(comando, [
      usuario.email
    ]);  

    console.log(linhas)

    return linhas;
  }

  export {CriarUsuario, obterUsuarioEmail}