export class Lancamento {
  constructor({
    id,
    usuario_id,
    nome_lancamento,
    valor,
    data_lancamento,
    tipo_lancamento,
  }) {
    this.id = Number(id);
    this.usuario_id = Number(usuario_id);
    this.nome_lancamento = nome_lancamento;
    this.valor = parseFloat(valor);
    this.data_lancamento = data_lancamento
      ? this.convertToUTC(data_lancamento)
      : null;
    this.tipo_lancamento = tipo_lancamento;
  }

  convertToUTC(dateString) {
    const date = new Date(dateString);
    const utcDate = new Date(date.toISOString());
    return utcDate;
  }
}
