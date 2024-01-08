<img src="https://capsule-render.vercel.app/api?type=waving&color=00bfbf&height=200&section=header&text=Projeto%20PDV&fontColor=fff&fontSize=40&animation=twinkling" />

# README - Projeto PDV API

Bem-vindo(a) ao meu projeto de Desafio do Módulo 5 - PDV (Frente de Caixa) API! Este projeto foi desenvolvido como resposta ao desafio proposto pela minha escola, utilizando JavaScript, Node.js, Express, PostgreSQL, Knex e Backblaze. É uma expressão do conhecimento adquirido ao longo dos estudos.

## Sobre o Projeto

A API gerencia um Ponto de Venda (PDV), oferecendo funcionalidades como cadastro de usuários, clientes, categorias e produtos, além de permitir a realização e gestão de pedidos. Todo o sistema é baseado em um banco de dados PostgreSQL, garantindo a persistência e manipulação eficientes dos dados. O Knex foi utilizado como um construtor de consultas SQL para interagir com o banco de dados.

## Funcionalidades Implementadas

### 1. Cadastro e Autenticação de Usuários:

- `POST /usuario`: Cadastro de novos usuários.
- `POST /login`: Autenticação de usuários, gerando tokens de acesso.
- `GET /usuario`: Detalhes do perfil do usuário logado.
- `PUT /usuario`: Atualização do perfil do usuário logado.

**Observação Importante:** Após o login, todas as funcionalidades (endpoints) a seguir, a partir desse ponto, exigirão o token de autenticação do usuário logado. O token deve ser enviado no header com o formato Bearer Token, e em cada funcionalidade será necessário validar o token informado.

### 2. Gestão de Produtos:

- `POST /produto`: Cadastro de novos produtos, incluindo upload de imagens com armazenamento no Backblaze.
- `PUT /produto/:id`: Atualização de informações de um produto, incluindo upload de novas imagens com armazenamento no Backblaze.
- `GET /produto`: Listagem de todos os produtos, com a opção de filtrar por categoria.
- `GET /produto/:id`: Detalhes de um produto específico.
- `DELETE /produto/:id`: Exclusão de um produto, considerando regras de negócio.

### 3. Gestão de Clientes:

- `POST /cliente`: Cadastro de novos clientes.
- `PUT /cliente/:id`: Atualização de informações de um cliente.
- `GET /cliente`: Listagem de todos os clientes.
- `GET /cliente/:id`: Detalhes de um cliente específico.

### 4. Gestão de Pedidos:

- `POST /pedido`: Cadastro de novos pedidos, com validações detalhadas, incluindo envio de e-mail na compra.
- `GET /pedido`: Listagem de todos os pedidos, com opção de filtrar por cliente.

## Upload de Imagens e Envio de E-mail

Este projeto permite o upload de imagens para os produtos cadastrados, melhorando a visualização e descrição dos itens, utilizando o Backblaze para o armazenamento eficiente das imagens. Além disso, ao realizar uma compra, é enviado um e-mail de confirmação para o cliente, proporcionando uma experiência completa e informativa.

## Tecnologias Utilizadas
- JavaScript
- Node.js
- Express
- PostgreSQL
- Knex
- Html
- Backblaze (armazenamento de imagens)
- Insomnia (para testes de API)

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="30" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="30" alt="html5 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="30" alt="git logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="30" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="30" alt="postgresql logo"  />
</div>

## Agradecimentos
Gostaria de expressar minha profunda gratidão ao iFood pela bolsa de estudos, que foi fundamental para adquirir os conhecimentos necessários para este projeto. Este aprendizado não apenas fortaleceu minha base técnica, mas também foi uma conquista pessoal significativa ao longo dos meus estudos.

Atenciosamente, Vitor

**Currículo:** [Visualizar Currículo](https://drive.google.com/file/d/1TM8QQWm-JQEcIZjDrZjc7RqdGG_I8T26/view?usp=sharing)


<div align="left">
  <a href="vitorr6278@gmail.com" target="_blank">
    <img src="https://img.shields.io/static/v1?message=Gmail&logo=gmail&label=&color=D14836&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="gmail logo"  />
  </a>
  <a href="https://linkedin.com/in/vitor-tavares-83085a276" target="_blank">
    <img src="https://img.shields.io/static/v1?message=LinkedIn&logo=linkedin&label=&color=0077B5&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="linkedin logo"  />
  </a>
  <a href="http://discordapp.com/users/____6278" target="_blank">
    <img src="https://img.shields.io/static/v1?message=Discord&logo=discord&label=&color=7289DA&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="discord logo"  />
  </a>
</div>

<img src="https://capsule-render.vercel.app/api?type=waving&color=00bfbf&height=200&section=footer&animation=twinkling" />
