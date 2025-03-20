const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'victor102090',
  database: 'vic'
});

// Conecta-se ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro de conexão: ' + err.stack);
    return;
  }
  console.log('Conectado ao MySQL como ID ' + connection.threadId);
});

// Rota para obter os nomes do banco de dados
app.get('/nomes', (req, res) => {
  connection.query('SELECT * FROM nomes', (err, results, fields) => {
    if (err) {
      console.error('Erro na consulta: ' + err.stack);
      res.status(500).send('Erro na consulta');
      return;
    }
    res.json(results); // Envia os resultados como resposta JSON
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


// Realiza a requisição para o servidor Node.js para obter os dados
fetch('http://localhost:3000/nomes')
.then(response => response.json())
.then(data => {
  console.log('Resultados:', data); // Exibe os resultados no console do navegador
})
.catch(error => console.error('Erro ao fazer a requisição:', error));