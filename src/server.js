import cors from "cors";
import "dotenv/config";
import express from "express";
import { rotasLancamento } from "./routes/rotasLancamento.js";
import { rotasLogin } from "./routes/rotasLogin.js";
import { rotasUsuario } from "./routes/rotasUsuario.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.use("/api/login", rotasLogin());
app.use("/api/usuario", rotasUsuario());
app.use("/api/lancamento", rotasLancamento());

app.listen(PORT, () => {
  console.log(`Servidor executando na porta: ${PORT}`);
});
