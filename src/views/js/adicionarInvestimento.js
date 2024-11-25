document.addEventListener("DOMContentLoaded", function () {
    async function enviarInvestimento(investimentoData) {
      try {
        await PostAPI("/api/investimentos", investimentoData);
        exibirModal("Investimento salvo com sucesso!", "fm");
      } catch (error) {
        exibirModal("Erro ao salvar o Investimento. Por favor, tente novamente.");
      }
    }
  
    function criarInvestimentoData() {
      const nomeInvestimento = document.getElementById("description_input").value;
      const valorInvestimento = parseFloat(
        document
          .getElementById("value_input")
          .value.replace(/[^\d,]/g, "")
          .replace(",", ".")
      ).toFixed(2);
      const rendimento_percentual_anual = document.getElementById("value_input_rendimento").value;
      const dataInvestimento = Date.now();
  
      return {
        nome_investimento: nomeInvestimento,
        valor_investido: valorInvestimento,
        rendimento_percentual_anual: rendimento_percentual_anual,
        data_investimento: new Date(dataInvestimento).toISOString(),
      };
    }
  
    document
      .getElementById("btntransacao")
      .addEventListener("click", async function () {

        const investimentoData = criarInvestimentoData();
  
        if (
          !investimentoData.nome_investimento ||
          !investimentoData.valor_investido ||
          !investimentoData.rendimento_percentual_anual ||
          !investimentoData.data_investimento
        ) {
          exibirModal("Por favor, preencha todos os campos obrigatórios.");
          return;
        }
  
        await enviarInvestimento(investimentoData);
      });
  
    document.querySelector(".close").addEventListener("click", function () {
      document.getElementById("modalMensagem").style.display = "none";
      
      window.location.href = "./investimentos.html";
    });
  });