async function CriarUsuario() {
  const nome = document.getElementById("nome_input").value;
  const email = document.getElementById("email_input").value;
  const senha = document.getElementById("senha_input").value;
  const senhaConf = document.getElementById("senha_input_conf").value;

  if (validaCriacao(nome, email, senha, senhaConf)) {
    usuario = {
      nome: nome,
      email: email,
      senha: senha,
    };

    await InsereUsuario("/api/usuario", usuario);
  }
}

async function validaCriacao(nome, email, senha, senhaConf) {
  let validado;
  if (nome.length < 3) {
    alert("Insira um nome válido!");
    return false;
  }

  if (!(await validacaoEmail())) {
    alert("Email inválido");
    return false;
  }
  if (senha.length < 3) {
    alert("Senha muito curta!");
    return false;
  }

  if (!senha == senhaConf) {
    alert("Senhas não correspondem!");
    return false;
  }

  return true;
}

async function validaSenha() {
  const senha = document.getElementById("senha_input").value;
  if (senha.length <= 2)
    document.getElementById("respostaSenha").innerHTML =
      "<font color='red'>Senha muito curta.</font>";
  else document.getElementById("respostaSenha").innerHTML = "";
}

function comparaSenhas() {
  const senha = document.getElementById("senha_input").value;
  const senhaConf = document.getElementById("senha_input_conf").value;

  if (senha == senhaConf)
    document.getElementById("respostaSenhaConf").innerHTML = "";
  else
    document.getElementById("respostaSenhaConf").innerHTML =
      "<font color='red'>Senhas não são iguais.</font>";
}

function validacaoEmail(field) {
  const email = document.getElementById("email_input").value;
  usuario = email.substring(0, email.indexOf("@"));
  dominio = email.substring(email.indexOf("@") + 1, email.length);

  if (
    usuario.length >= 1 &&
    dominio.length >= 3 &&
    usuario.search("@") == -1 &&
    dominio.search("@") == -1 &&
    usuario.search(" ") == -1 &&
    dominio.search(" ") == -1 &&
    dominio.search(".") != -1 &&
    dominio.indexOf(".") >= 1 &&
    dominio.lastIndexOf(".") < dominio.length - 1
  ) {
    document.getElementById("respostaEmail").innerHTML = "";
    return true;
  } else {
    document.getElementById("respostaEmail").innerHTML =
      "<font color='red'>email inválido </font>";
    return false;
  }
}

async function InsereUsuario(route, body) {
  const token = await BuscaToken();

  const result = await fetch(baseURL + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  })
    .then(async function (response) {
      if (response.status == 409) {
        alert("email já cadastrado!");
      } else if (response.status == 200) {
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "./login.html";
      } else {
        alert("Erro ao salvar a transação. Por favor, tente novamente.");
      }
    })
    .catch(async function (error) {
      alert("Erro ao fazer a requisição. Por favor, tente novamente.");
    });
}
