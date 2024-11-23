export class Investimento {
  constructor({
    id,
    usuario_id,
    nome_investimento,
    valor_investido,
    data_investimento,
    rendimento_percentual_anual,
  }) {
    this.id = Number(id);
    this.usuario_id = Number(usuario_id);
    this.nome_investimento = nome_investimento;
    this.valor_investido = parseFloat(valor_investido);
    this.data_investimento = data_investimento
      ? this.convertToUTC(data_investimento)
      : null;
    this.rendimento_percentual_anual = rendimento_percentual_anual;
    this.rendimento_esperado = parseFloat(
      ((rendimento_percentual_anual / 100) * valor_investido).toFixed(2)
    );
  }

  convertToUTC(dateString) {
    const date = new Date(dateString);
    const utcDate = new Date(date.toISOString());
    return utcDate;
  }
}
