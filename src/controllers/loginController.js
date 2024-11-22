import { ValidarLogin } from "../data/repositories/loginRepository.js";
import { gerarToken } from "../services/jwtService.js";

export const Userlogin = async (req, resp) => {
  try {
    let userLogin = req.body;

    if (!userLogin.email) return "Necessário informar o login!";

    if (!userLogin.senha) return "Necessário informar a senha!";

    const linhas = await ValidarLogin(userLogin);

    if (linhas.length > 0) resp.status(200).json(await gerarToken(linhas[0]));
    else resp.status(404).json({ message: "Nenhum resultado encontrado" });
  } catch (err) {
    console.log(err);
  }
};
