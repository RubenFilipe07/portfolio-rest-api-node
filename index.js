const express = require('express');
const app = express();
const port = 443;

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

app.use(express.json()); 

app.use((req, res, next) => {
    const apiKey = req.headers['api-key'];
    if (apiKey === process.env.API_KEY) {
        next();
    } else {
        res.status(401).send('API Key inválida');
    }
});

app.post('/projetos', (req, res) => {
    const { titulo, descricao, data_criacao, descricao_extendida, tecnologias_utilizadas, imagem_principal_url, imagens_url} = req.body;
    pool.query('INSERT INTO projetos (titulo, descricao, data_criacao, descricao_extendida, tecnologias_utilizadas, imagem_principal_url, imagens_url) VALUES ($1, $2, $3, $4, $5, $6, $7)', [titulo, descricao, data_criacao, descricao_extendida, tecnologias_utilizadas, imagem_principal_url, imagens_url], (err, result) => {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.json({ status: 'success', message: 'Projeto adicionado com sucesso' });
        }
    });
});

app.get('/projetos', (req, res) => {
    pool.query('SELECT * FROM projetos', (err, result) => {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.json(result.rows);
        }
    });
});

app.get('/projetos/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM projetos WHERE id = $1', [id], (err, result) => {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.json(result.rows);
        }
    });

});

app.delete('/projetos/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM projetos WHERE id = $1', [id], (err, result) => {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.json({ status: 'success', message: 'Projeto deletado com sucesso' });
        }
    });
});

app.put('/projetos/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, data_criacao, descricao_extendida, tecnologias_utilizadas, imagem_principal_url, imagens_url } = req.body;
    pool.query('UPDATE projetos SET titulo = $1, descricao = $2, data_criacao = $3, descricao_extendida = $4, tecnologias_utilizadas = $5, imagem_principal_url = $6, imagens_url = $7 WHERE id = $8', [titulo, descricao, data_criacao, descricao_extendida, tecnologias_utilizadas, imagem_principal_url, imagens_url, id], (err, result) => {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.json({ status: 'success', message: 'Projeto atualizado com sucesso' });
        }
    });
});


app.listen(port, () => {
    console.log(`rodando em http://localhost:${port}`)
});