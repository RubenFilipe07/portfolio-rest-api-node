const express = require('express');
const app = express();
const port = 8080;

const cors = require('cors');
app.use(cors());

const nodemailer = require('nodemailer');

require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
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


pool.query(`
    CREATE TABLE IF NOT EXISTS projetos (
        id SERIAL PRIMARY KEY,
        titulo TEXT NOT NULL,
        url TEXT NOT NULL,
        descricao TEXT NOT NULL,
        data_criacao TEXT NOT NULL,
        descricao_extendida TEXT NOT NULL,
        tecnologias_utilizadas TEXT[] NOT NULL,
        imagem_principal_url TEXT NOT NULL,
        imagens_url TEXT[] NOT NULL
    )
`, (err, result) => {
    if (err) {
        console.error('Erro ao criar tabela:', err);
    } else {
        console.log('Tabela criada com sucesso');
    }
})

app.post('/projetos', (req, res) => {
    const { titulo, url, descricao, data_criacao, descricao_extendida, tecnologias_utilizadas, imagem_principal_url, imagens_url} = req.body;
    pool.query('INSERT INTO projetos (titulo, url, descricao, data_criacao, descricao_extendida, tecnologias_utilizadas, imagem_principal_url, imagens_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [titulo, url, descricao, data_criacao, descricao_extendida, tecnologias_utilizadas, imagem_principal_url, imagens_url], (err, result) => {
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

app.delete('/projetos', (req, res) => {
    const { titulo, url, descricao, data_criacao, descricao_extendida, tecnologias_utilizadas, imagem_principal_url, imagens_url} = req.body;
    pool.query('DELETE FROM projetos WHERE titulo = $1 AND url = $2 AND descricao = $3 AND data_criacao = $4 AND descricao_extendida = $5 AND tecnologias_utilizadas = $6 AND imagem_principal_url = $7 AND imagens_url = $8', [titulo, url, descricao, data_criacao, descricao_extendida, tecnologias_utilizadas, imagem_principal_url, imagens_url], (err, result) => {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.json({ status: 'success', message: 'Projeto deletado com sucesso' });
        }
    });
});

app.put('/projetos', (req, res) => {
    const { id, titulo, url, descricao, data_criacao, descricao_extendida, tecnologias_utilizadas, imagem_principal_url, imagens_url} = req.body;
    pool.query('UPDATE projetos SET titulo = $1, url =$2, descricao = $3, data_criacao = $4, descricao_extendida = $5, tecnologias_utilizadas = $6, imagem_principal_url = $7, imagens_url = $8 WHERE id = $9', [titulo, url, descricao, data_criacao, descricao_extendida, tecnologias_utilizadas, imagem_principal_url, imagens_url, id], (err, result) => {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.json({ status: 'success', message: 'Projeto atualizado com sucesso' });
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
    const { titulo, url, descricao, data_criacao, descricao_extendida, tecnologias_utilizadas, imagem_principal_url, imagens_url} = req.body;
    pool.query('UPDATE projetos SET titulo = $1, url =$2, descricao = $3, data_criacao = $4, descricao_extendida = $5, tecnologias_utilizadas = $6, imagem_principal_url = $7, imagens_url = $8 WHERE id = $9', [titulo, url, descricao, data_criacao, descricao_extendida, tecnologias_utilizadas, imagem_principal_url, imagens_url, id], (err, result) => {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.json({ status: 'success', message: 'Projeto atualizado com sucesso' });
        }
    });
});

app.post('/email', (req, res) => {
    const { nome, email, mensagem } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }

    });
  
    const mailOptions = {
      from: email,
      to: process.env.RECEIVER_EMAIL,
      subject: 'Contato do portfólio',
      text: `Nome: ${nome} \nEmail: ${email} \nMensagem: ${mensagem}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error.toString());
      } else {
        res.json({ status: 'success', mensagem: 'Email enviado com sucesso' });
      }
    });

});


app.listen(port, () => {
    console.log(`Rodando em http://localhost:${port}`)
});

