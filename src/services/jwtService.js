import jwt from "jsonwebtoken";

const secret = "ptidesenvolvimento";

function gerarToken(usuario) {
  const user = {
    userId: usuario.id,
  };
  return jwt.sign(user, secret, { expiresIn: "1h" });
}

// Função para verificar o token JWT
function verificarToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido" });
  }

  const tokenFormat = req.headers.authorization.split(" ")[1];

  jwt.verify(tokenFormat, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: "Token inválido" });
    }
    req.usuario = decoded;
    next();
  });
}

export { gerarToken, verificarToken };
