document.addEventListener("DOMContentLoaded", async function (e) {
    await ValidaToken();
  
    const saldo = await GetAPI("/api/lancamento/saldo");
    const despesa = await GetAPI("/api/lancamento/despesamensal");
    const receita = await GetAPI("/api/lancamento/receitamensal");
  
    document.getElementById("saldo").innerHTML = mascaraMoeda(saldo.valor);
    document.getElementById("despesa").innerHTML = mascaraMoeda(despesa.valor);
    document.getElementById("receita").innerHTML = mascaraMoeda(receita.valor);

    const nomeUsuario = await BuscaNomeUsuario();

    document.getElementById("nomeUsuario").innerHTML = nomeUsuario;


   

});