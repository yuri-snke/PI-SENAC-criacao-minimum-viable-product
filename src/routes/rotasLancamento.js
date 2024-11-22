import express from "express";
import {
  atualizarLancamentoPorId,
  criarLancamento,
  excluirLancamento,
  obterDespesaMensal,
  obterLancamentoPorId,
  obterLancamentos,
  obterReceitaMensal,
  obterSaldo,
} from "../controllers/lancamentoController.js";
import { verificarToken } from "../services/jwtService.js";
const router = express.Router();

export function rotasLancamento() {
  router.get("/", verificarToken, (req, res) => obterLancamentos(req, res));
  router.get("/receitamensal", verificarToken, (req, res) =>
    obterReceitaMensal(req, res)
  );
  router.get("/despesamensal", verificarToken, (req, res) =>
    obterDespesaMensal(req, res)
  );
  router.get("/saldo", verificarToken, (req, res) => obterSaldo(req, res));
  router.post("/", verificarToken, (req, res) => criarLancamento(req, res));
  router.delete("/:id", verificarToken, (req, res) =>
    excluirLancamento(req, res)
  );
  router.get("/:id", verificarToken, (req, res) =>
    obterLancamentoPorId(req, res)
  );
  router.put("/:id", verificarToken, (req, res) =>
    atualizarLancamentoPorId(req, res)
  );
  return router;
}
