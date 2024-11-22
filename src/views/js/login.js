async function FazerLogin() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const resposta = await PostAPI("/api/login", { email: email, senha: senha });

  localStorage.setItem("token", "Bearer " + resposta);

  window.location.href = "./index.html";
}

async function RedirectCriarUsuario(){
  window.location.href = "./criarUsuario.html";
}
