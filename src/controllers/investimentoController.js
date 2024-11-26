import {
  buscaInvestimentos,
  criarInvestimentoRep,
} from "../data/repositories/investimentoRepository.js";
import { Investimento } from "../models/investimentoModel.js";

export const obterInvestimentos = async (req, res) => {
  try {
    const investimentosData = await buscaInvestimentos(req.usuario.userId);
    if (investimentosData.length > 0) {
      const investimentos = investimentosData.map(
        (investimento) => new Investimento(investimento)
      );
      res.send(investimentos);
    } else {
      res.status(404).send({ message: "Nenhum resultado encontrado" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const criarInvestimento = async (req, res) => {
  try {
    const investimento = new Investimento({
      ...req.body,
      usuario_id: req.usuario.userId,
      valor_investido: isNaN(parseFloat(req.body.valor_investido))
        ? 0
        : parseFloat(req.body.valor_investido),
      rendimento_percentual_anual: isNaN(
        parseFloat(req.body.rendimento_percentual_anual)
      )
        ? 0
        : parseFloat(req.body.rendimento_percentual_anual),
    });

    const investimentoId = await criarInvestimentoRep(investimento);

    res.send({
      message: "Investimento criado com sucesso!",
      id: investimentoId,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
