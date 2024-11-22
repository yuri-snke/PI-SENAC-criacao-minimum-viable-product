import { Lancamento } from "../../models/lancamentoModel.js";
import con from "../connection.js";

export async function BuscarLancamentosPorIDUsuario(userID) {
  const comando = `SELECT * FROM tbl_lancamento WHERE usuario_id = ?`;

  const [linhas] = await con.query(comando, [userID]);
  return linhas;
}

export async function BuscarDespesasMes(userID) {
  const comando = `SELECT COALESCE(SUM(valor), 0) AS valor
                  FROM tbl_lancamento
                  WHERE MONTH(data_lancamento) = MONTH(CURDATE())
                  AND YEAR(data_lancamento) = YEAR(CURDATE())
                  AND usuario_id = ?
                  AND tipo_lancamento = 'despesa'`;

  const [linha] = await con.query(comando, [userID]);

  return linha[0] ? { valor: parseFloat(linha[0].valor) || 0 } : { valor: 0 };
}

export async function BuscarReceitasMes(userID) {
  const comando = `SELECT COALESCE(SUM(valor), 0) AS valor
                  FROM tbl_lancamento
                  WHERE MONTH(data_lancamento) = MONTH(CURDATE())
                  AND YEAR(data_lancamento) = YEAR(CURDATE())
                  AND usuario_id = ?
                  AND tipo_lancamento = 'receita'`;

  const [linha] = await con.query(comando, [userID]);

  return linha[0] ? { valor: parseFloat(linha[0].valor) || 0 } : { valor: 0 };
}

export async function CriarLancamento(lancamento) {
  let comando = `INSERT INTO tbl_lancamento
                (usuario_id, nome_lancamento, valor, data_lancamento, tipo_lancamento)
                VALUES (?, ?, ?, ?, ?)`;

  let result = await con.query(comando, [
    lancamento.usuario_id,
    lancamento.nome_lancamento,
    lancamento.valor,
    lancamento.data_lancamento,
    lancamento.tipo_lancamento,
  ]);

  return result[0]?.insertId;
}

export async function ExcluirLancamento(lancamento) {
  let comando = `DELETE FROM tbl_lancamento WHERE id = ? AND usuario_id = ?`;
  const [result] = await con.query(comando, [
    lancamento.id,
    lancamento.usuario_id,
  ]);

  if (result?.affectedRows > 0) {
    return result?.affectedRows;
  } else {
    throw new Error("Falha ao deletar lançamento.");
  }
}

export async function ObterLancamentoPorId(lancamento) {
  let comando = `SELECT * FROM tbl_lancamento WHERE id = ? AND usuario_id = ?`;

  const [result] = await con.query(comando, [
    lancamento.id,
    lancamento.usuario_id,
  ]);

  if (result.length > 0) {
    const lancamentoEncontrado = new Lancamento(result[0]);
    return lancamentoEncontrado;
  } else {
    throw new Error("Não há registros a serem capturados.");
  }
}

export async function AtualizarLancamentoPorId(lancamento) {
  let transacaoSalva = await ObterLancamentoPorId(lancamento);

  if (transacaoSalva !== null) {
    let comando = `UPDATE tbl_lancamento SET
      nome_lancamento = ?, valor = ?, data_lancamento = ?, tipo_lancamento = ?
      WHERE id = ? AND usuario_id = ?`;

    let result = await con.query(comando, [
      lancamento.nome_lancamento,
      lancamento.valor,
      lancamento.data_lancamento,
      lancamento.tipo_lancamento,
      lancamento.id,
      lancamento.usuario_id,
    ]);

    if (result[0]?.affectedRows > 0) {
      return lancamento.id;
    } else {
      throw new Error("Falha ao atualizar lançamento.");
    }
  }
}
