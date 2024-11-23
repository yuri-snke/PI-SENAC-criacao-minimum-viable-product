async function FazerLogin() {
  const email = document.getElementById("email_input").value;
  const senha = document.getElementById("senha_input").value;

  const resposta = await PostAPI("/api/login", { email: email, senha: senha });

  localStorage.setItem("token", "Bearer " + resposta.token);
  localStorage.setItem("nomeUsuario", resposta.nomeUsuario);


  window.location.href = "./index.html";
}

async function RedirectCriarUsuario(){
  window.location.href = "./criarUsuario.html";
}
