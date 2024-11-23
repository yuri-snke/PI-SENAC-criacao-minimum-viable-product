document.addEventListener("DOMContentLoaded", async function (e) {
    await ValidaToken();

    const usuario = await BuscaNomeUsuario();
    document.getElementById("nomeUsuario").innerHTML = usuario;
  
    const lancamentos = await GetAPI("/api/lancamento/despesamensalitens");
  
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


});


async function CriarRegistro(registro) {
    const novoRegistro = document.createElement("tr");
    let cardCollor = "green content-info";
    


    if(registro.tipo_lancamento == "despesa")     
      cardCollor = "red content-info"

  
    novoRegistro.innerHTML = ` <td>${
                        registro.id
                        }</td>
                        <td>${registro.nome_lancamento}</td>
                        <td>${mascaraMoeda(registro.valor)}</td>
                        <td>12/01/2024</td>
                        <td class="lixeira" id="lixeira" onclick="confirmarExclusao(${
                        registro.id
                        })"><i class="fa-solid fa-trash" ></i></td>`;
  
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

  