document.addEventListener("DOMContentLoaded", function () {
    async function enviarLancamento(LancamentoData) {
      try {
        await PostAPI("/api/lancamento", LancamentoData);
        exibirModal("Lançamento salvo com sucesso!", "fm");
      } catch (error) {
        exibirModal("Erro ao salvar o Lançamento. Por favor, tente novamente.");
      }
    }
  
    function criarLancamentoData() {
      const nomeLancamento = document.getElementById("description_input").value;
      const valorLancamento = parseFloat(
        document
          .getElementById("value_input")
          .value.replace(/[^\d,]/g, "")
          .replace(",", ".")
      ).toFixed(2);
      const tipoLancamento = document.getElementById("tipo_lancamento").value;
      const dataLancamento = Date.now();
  
      return {
        nome_lancamento: nomeLancamento,
        valor: valorLancamento,
        tipo_lancamento: tipoLancamento,
        data_lancamento: new Date(dataLancamento).toISOString(),
      };
    }
  
    document
      .getElementById("btntransacao")
      .addEventListener("click", async function () {

        const LancamentoData = criarLancamentoData();
  
        if (
          !LancamentoData.nome_lancamento ||
          !LancamentoData.valor ||
          !LancamentoData.tipo_lancamento ||
          !LancamentoData.data_lancamento
        ) {
          exibirModal("Por favor, preencha todos os campos obrigatórios.");
          return;
        }
  
        await enviarLancamento(LancamentoData);
      });
  
    document.querySelector(".close").addEventListener("click", function () {
      document.getElementById("modalMensagem").style.display = "none";
      history.back();
      window.location.href = "./lancamentos.html";
    });
  });