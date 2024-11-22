import {
  AtualizarLancamentoPorId,
  BuscarDespesasMes,
  BuscarLancamentosPorIDUsuario,
  BuscarReceitasMes,
  CriarLancamento,
  ExcluirLancamento,
  ObterLancamentoPorId,
} from "../data/repositories/lancamentoRepository.js";
import { Lancamento } from "../models/lancamentoModel.js";

export const obterLancamentos = async (req, res) => {
  try {
    const lancamentosData = await BuscarLancamentosPorIDUsuario(
      req.usuario.userId
    );

    if (lancamentosData.length > 0) {
      const lancamentos = lancamentosData.map(
        (lancamento) => new Lancamento(lancamento)
      );

      res.send(lancamentos);
    } else {
      res.status(404).send({ message: "Nenhum resultado encontrado" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const obterDespesaMensal = async (req, res) => {
  try {
    const despesasData = await BuscarDespesasMes(req.usuario.userId);

    const despesas = {
      valor: isNaN(parseFloat(despesasData.valor))
        ? 0
        : parseFloat(despesasData.valor),
    };

    res.send(despesas);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const obterReceitaMensal = async (req, res) => {
  try {
    const receitasData = await BuscarReceitasMes(req.usuario.userId);

    const receitas = {
      valor: isNaN(parseFloat(receitasData.valor))
        ? 0
        : parseFloat(receitasData.valor),
    };

    res.send(receitas);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const obterSaldo = async (req, res) => {
  try {
    const receitaData = await BuscarReceitasMes(req.usuario.userId);
    const despesaData = await BuscarDespesasMes(req.usuario.userId);

    const receitaValor = isNaN(parseFloat(receitaData.valor))
      ? 0
      : parseFloat(receitaData.valor);
    const despesaValor = isNaN(parseFloat(despesaData.valor))
      ? 0
      : parseFloat(despesaData.valor);

    const saldo = receitaValor - despesaValor;

    res.send({ valor: saldo });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const criarLancamento = async (req, res) => {
  try {
    const lancamento = new Lancamento({
      ...req.body,
      usuario_id: req.usuario.userId,
      valor: isNaN(parseFloat(req.body.valor)) ? 0 : parseFloat(req.body.valor), // Garantindo a conversão do valor
    });

    const lancamentoId = await CriarLancamento(lancamento);

    res.send({
      message: "Lançamento criado com sucesso!",
      id: lancamentoId,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const excluirLancamento = async (req, res) => {
  try {
    const lancamento = {
      id: req.params.id,
      usuario_id: req.usuario.userId,
    };

    await ExcluirLancamento(lancamento);
    res.send({ mensagem: "Lançamento deletado com sucesso!" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const obterLancamentoPorId = async (req, res) => {
  try {
    const lancamento = new Lancamento({
      id: req.params.id,
      usuario_id: req.usuario.userId,
    });

    const result = await ObterLancamentoPorId(lancamento);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const atualizarLancamentoPorId = async (req, res) => {
  try {
    const lancamento = new Lancamento({
      id: req.params.id,
      usuario_id: req.usuario.userId,
      ...req.body,
    });

    const lancamentoId = await AtualizarLancamentoPorId(lancamento);
    res.send({
      message: "Lançamento atualizado com sucesso!",
      id: lancamentoId,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
