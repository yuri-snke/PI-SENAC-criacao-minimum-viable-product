import cors from "cors";
import "dotenv/config";
import express from "express";
import { rotasLogin } from "./routes/rotasLogin.js";
import { rotasUsuario } from "./routes/rotasUsuario.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.use("/api/login", rotasLogin());
app.use("/api/usuario", rotasUsuario());

app.listen(PORT, () => {
  console.log(`Servidor executando na porta: ${PORT}`);
});
