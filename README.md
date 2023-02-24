# portfolio-rest-api-node
<h3>Introdução</h3>
Este é um projeto de API REST em Node.js que permite gerenciar envios de email e os projetos exibidos em meu portfólio. Ele foi desenvolvido utilizando Express, CORS, Nodemailer, dotenv, e um banco de dados PostgreSQL.

<h3>Atributos</h3>
<code>id</code> (number): ID do projeto no banco de dados. </br>
<code>titulo</code> (string): Título do projeto.  </br>
<code>url</code> (string): URL do projeto.  </br> 
<code>descricao</code> (string): Descrição breve do projeto.  </br>
<code>data_criacao</code> (string): Data de criação do projeto no formato "dd-mm-yyyy".  </br>
<code>descricao_extendida</code> (string): Descrição detalhada do projeto.  </br>
<code>tecnologias_utilizadas</code> (array de strings): Lista de tecnologias utilizadas no projeto.  </br>
<code>imagem_principal_url</code> (string): URL da imagem principal do projeto.  </br>
<code>imagens_url</code> (array de strings): Lista de URLs das imagens adicionais do projeto.  </br>

<h3>Métodos</h3>
<code>POST /projetos</code>: cria um novo projeto e o adiciona ao banco de dados <br/>
<code>GET /projetos</code>: entrega uma lista de todos os projetos no banco de dados <br/>
<code>GET /projetos/:id</code>: entrega um projeto específico com base em seu ID <br/>
<code>DELETE /projetos/:id</code>: exclui um projeto específico com base em seu ID <br/>
<code>DELETE /projetos/</code>: exclui um projeto específico com base nos atributos <br/>
<code>PUT /projetos/:id</code>: atualiza um projeto específico com base em seu ID <br/>
<code>PUT /projetos/</code>: atualiza um projeto específico com base nos atributos <br/>
<code>POST /email</code>: envia um email <br/>

<h3>arquivo .ENV</h3>
<code>API_KEY</code>: Chave de autenticação autoriza a utilização da API por um cliente.<br/>
<code>DATABASE_URL</code>:  URL que faz conexão com banco de dados. <br/>
<code>EMAIL</code>:  Endereço de email  de origem que será utilizado para enviar os emails. <br/>
<code>PASSWORD</code>:  Senha  do endereço de email que será utilizado para enviar os emails. <br/>
<code>RECEIVER_EMAIL</code>: Endereço de email de destino. 

<h3>Como executar?</h3>
<ol>
  <li>Instale o node.js: <a href="https://nodejs.org/">nodejs.org</a> </li>
  <li>Na raiz do projeto execute<code>npm i</code> para instalar as dependências</li>
  <li>Crie um arquivo .ENV e adicione as variáveis de ambiente (descritas acima)</li>
  <li>Instale o PostgreSQL.js: <a href="https://www.postgresql.org/download/">postgresql.org</a> </li>
  <li>Execute <code>node index.js</code> para iniciar a aplicação</li>
  <li>O projeto rodará em: <code>https://localhost:8080/</code></li>
</ol>

<h3>Tecnologias utilizadas:</h3>

<a href="https://nodejs.org/">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
</a> <br/>

<a href="https://expressjs.com/">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
</a> <br/>

<a href="https://www.postgresql.org/">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white"/>
</a> <br/>

<a href="https://nodemailer.com/">
  <img src="https://img.shields.io/badge/nodemailer-2babdf?style=for-the-badge&logoColor=white"/>
</a> <br/>



