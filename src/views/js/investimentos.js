document.addEventListener("DOMContentLoaded", async function (e) {
    await ValidaToken();

  
    const lancamentos = await GetAPI("/api/investimentos");
  
    if (lancamentos && lancamentos.message === "Nenhum resultado encontrado") {
      return;
    }
    let totalinvestiment = 0;
    lancamentos.forEach(async (registro) => {   
        totalinvestiment = totalinvestiment + registro.valor_investido;
      await CriarRegistro(registro);
    });


    
    document.getElementById("totalInvestido").innerHTML = mascaraMoeda(totalinvestiment);


});


async function CriarRegistro(registro) {
    const novoRegistro = document.createElement("div");
 
  
    novoRegistro.innerHTML = `  <div class="card_investimento">
                    <div class="nomeInveste" id="nomeInvestimento">
                        <h4>Nome investimento</h4>
                        <h5>${
                            registro.nome_investimento
                          }</h5>
                    </div>
                    <div class="valorInveste" id="valorInvestido">
                        <h4>Valor investido</h4>
                        <h5>${
                            mascaraMoeda(registro.valor_investido)
                          }</h5>
                    </div>
                    <div class="rendimentoInveste" id="rendimentoInvestido">
                        <h4>Rendimento anual</h4>
                        <h5>${
                            registro.rendimento_percentual_anual
                          }%</h5>
                    </div>
                    <div class="estimativaInveste id="valorEstimado"">
                        <h4>Valor estimado</h4>
                        <h5>${
                            mascaraMoeda(registro.rendimento_esperado)
                          }</h5>
                    </div>

                </div>`;
  
    document.getElementById("listaCards").appendChild(novoRegistro);
}


  