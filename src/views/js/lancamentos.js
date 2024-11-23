document.addEventListener("DOMContentLoaded", async function (e) {
    await ValidaToken();

    const usuario = await BuscaNomeUsuario();
    document.getElementById("nomeUsuario").innerHTML = usuario;
  
    const lancamentos = await GetAPI("/api/lancamento");
  
    if (lancamentos && lancamentos.message === "Nenhum resultado encontrado") {
      return;
    }
    let countEntrada = 0;
    let countSaida = 0;
  
    lancamentos.forEach(async (registro) => {
      if(registro.tipo_lancamento == "despesa"){
        countSaida++;
      }else{
        countEntrada++;
      }
      await CriarRegistro(registro);
    });

    document.getElementById("countEntrada").innerHTML = countEntrada;
    document.getElementById("countSaida").innerHTML = countSaida;


  });
  
  async function CriarRegistro(registro) {
    const novoRegistro = document.createElement("li");
    let cardCollor = "green content-info";
    


    if(registro.tipo_lancamento == "despesa")     
      cardCollor = "red content-info"

  
    novoRegistro.innerHTML = `<div class="${cardCollor}">
                      <p class="ID_lancamento" style="display:none;">ID: ${
                      registro.id
                    }</p>
                    <i class="fa-solid fa-xmark" onclick="confirmarExclusao(${
                    registro.id
                    })"></i>
                    <h2>${registro.nome_lancamento}</h2>
                    <h3>${mascaraMoeda(registro.valor)}</h3>
                </div>`;
  
    document.getElementById("listaRegistros").appendChild(novoRegistro);
  }
  
  async function confirmarExclusao(id) {
    if (confirm(`Deseja excluir o lançamento?`)) {
      try {
        await DeleteAPI(`/api/lancamento/${id}`);
  
        window.location.reload();
      } catch (error) {
        alert("Erro ao excluir transação. Por favor, tente novamente.");
      }
    }
  }
  