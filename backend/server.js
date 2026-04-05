const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();


app.use(cors());
app.use(express.json()); 


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'loja_karate',
  password: '123456',
  port: 5432,
});

app.get('/produtos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produtos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
});


app.post('/comprar', async (req, res) => {
  try {
    const { produto_id } = req.body;

    if (!produto_id) {
      return res.status(400).json({ erro: 'produto_id é obrigatório' });
    }

    await pool.query(
      'INSERT INTO compras (produto_id) VALUES ($1)',
      [produto_id]
    );

    res.json({ mensagem: 'Compra realizada com sucesso!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao registrar compra' });
  }
});


app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});