import express from "express";
import { obterInvestimentos, criarInvestimento } from "../controllers/investimentoController.js";
import { verificarToken } from "../services/jwtService.js";

const router = express.Router();

export function rotasInvestimentos() {
  router.get("/", verificarToken, (req, res) => obterInvestimentos(req, res));
  router.post("/", verificarToken, (req, res) => criarInvestimento(req, res));

  return router;
}
