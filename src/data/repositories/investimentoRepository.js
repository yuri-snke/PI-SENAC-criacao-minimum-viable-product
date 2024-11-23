import con from "../connection.js";

export async function buscaInvestimentos(usuarioId) {
  let comando = `select * from tbl_investimento where usuario_id = ?`;

  const [linhas] = await con.query(comando, [usuarioId]);

  return linhas;
}


export async function criarInvestimentoRep(lancamento) {
  let comando = `INSERT INTO tbl_investimento
                (usuario_id, nome_investimento, valor_investido, data_investimento, rendimento_percentual_anual)
                VALUES (?, ?, ?, ?, ?)`;

  let result = await con.query(comando, [
    lancamento.usuario_id,
    lancamento.nome_investimento,
    lancamento.valor_investido,
    lancamento.data_investimento,
    lancamento.rendimento_percentual_anual,
  ]);

  return result[0]?.insertId;
}