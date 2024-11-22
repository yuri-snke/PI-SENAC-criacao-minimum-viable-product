import "dotenv/config";
import fs from "fs";
import mysql from "mysql2/promise";

const seedDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PWD,
    });

    const dumpSQL = fs.readFileSync("./dump.sql", "utf-8");

    const sqlStatements = dumpSQL
      .split(";")
      .filter((statement) => statement.trim() !== "");

    for (const statement of sqlStatements) {
      await connection.query(statement);
    }

    console.log("Banco de dados e tabelas criados com sucesso!");

    await populateData(connection);

    await connection.end();
  } catch (error) {
    console.error("Erro ao executar o seed:", error);
  }
};

const populateData = async (connection) => {
  await connection.query(
    "INSERT INTO tbl_usuario (nome, email, senha) VALUES (?, ?, ?)",
    ["Administrador", "admin", "admin"]
  );
  console.log("Usuário admin criado com sucesso!");

  const lancamentos = [
    [1, "Aluguel", 2000.0, "2024-11-21", "despesa"],
    [1, "Salário", 5000.0, "2024-11-20", "receita"],
    [1, "Compra de Materiais", 800.0, "2024-11-18", "despesa"],
    [1, "Consultoria", 1500.0, "2024-11-15", "receita"],
    [1, "Internet", 150.0, "2024-11-10", "despesa"],
  ];

  for (const lancamento of lancamentos) {
    await connection.query(
      "INSERT INTO tbl_lancamento (usuario_id, nome_lancamento, valor, data_lancamento, tipo_lancamento) VALUES (?, ?, ?, ?, ?)",
      lancamento
    );
  }

  console.log("Lançamentos populados com sucesso!");

  const investimentos = [
    [1, "Fundo Imobiliário Alpha", 15000.0, "2024-01-15", 8.5],
    [1, "Ações XYZ", 25000.0, "2024-03-10", 12.3],
    [1, "CDB Banco Central", 10000.0, "2024-06-05", 9.2],
    [1, "Tesouro Selic 2030", 5000.0, "2024-08-20", 6.1],
    [1, "Criptomoeda BTC", 3000.0, "2024-09-15", 25.7],
  ];

  for (const investimento of investimentos) {
    await connection.query(
      "INSERT INTO tbl_investimento (usuario_id, nome_investimento, valor_investido, data_investimento, rendimento_percentual_anual) VALUES (?, ?, ?, ?, ?)",
      investimento
    );
  }

  console.log("Investimentos populados com sucesso!");
};

seedDatabase();
