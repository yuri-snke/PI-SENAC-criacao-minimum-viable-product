class Usuario {
    constructor({
      id,
      nome,
      email,
      senha
    }) {
      this.id = Number(id);
      this.nome = nome;
      this.email = email;
      this.senha = senha;
    }
  }
  
  export { Usuario };
  