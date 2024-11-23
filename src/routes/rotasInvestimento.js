import express from "express";
import { obterInvestimentos } from "../controllers/investimentoController.js";
import { verificarToken } from "../services/jwtService.js";

const router = express.Router();

export function rotasInvestimentos() {
  router.get("/", verificarToken, (req, res) => obterInvestimentos(req, res));

  return router;
}