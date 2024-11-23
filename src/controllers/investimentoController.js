import {
    buscaInvestimentos,
  } from "../data/repositories/investimentoRepository.js";
import { Investimento } from "../models/investimentoModel.js";
  
  export const obterInvestimentos = async (req, res) => {
    try {
      const investimentosData = await buscaInvestimentos(
        req.usuario.userId
      );
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
  