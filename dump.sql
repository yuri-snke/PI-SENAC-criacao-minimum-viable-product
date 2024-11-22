DROP DATABASE IF EXISTS pi_senac_fincontrole;

CREATE DATABASE pi_senac_fincontrole;

SET time_zone = '+00:00';

USE pi_senac_fincontrole;

CREATE TABLE tbl_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(50) NOT NULL
);

CREATE TABLE tbl_lancamento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    nome_lancamento VARCHAR(100) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data_lancamento DATE NOT NULL,
    tipo_lancamento ENUM('despesa', 'receita') NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES tbl_usuario(id)
);

CREATE TABLE tbl_investimento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    nome_investimento VARCHAR(100) NOT NULL,
    valor_investido DECIMAL(10, 2) NOT NULL,
    data_investimento DATE NOT NULL,
    rendimento_percentual_anual DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES tbl_usuario(id)
);
