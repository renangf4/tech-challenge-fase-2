[Documentação Interativa da API](https://apiblogpost.apidog.io/)

# API de Gerenciamento de Posts

Este projeto é uma API RESTful desenvolvida em **Node.js** e **Express** para gerenciar posts. Os dados são armazenados em um banco de dados **MongoDB** e o acesso às rotas é protegido por autenticação JWT.

## Funcionalidades

- Adicionar posts
- Listar todos os posts
- Buscar posts por critérios (título, conteúdo, autor)
- Buscar post por ID
- Atualizar post
- Excluir post

## Modelo de Dados

Cada post possui os seguintes campos:

- `title` (string, obrigatório): Título do post
- `content` (string, obrigatório): Conteúdo do post
- `author` (string, obrigatório): Autor do post
- `createdAt` (date, gerado automaticamente): Data de criação

## Requisitos

- Node.js
- MongoDB (URI de conexão)

## Instalação

1. Clone o repositório e acesse a pasta do projeto.
2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
PORT=3000
DB_URI=mongodb://localhost:27017/seubanco
JWT_KEY=sua_chave_secreta
```

## Executando a Aplicação

```bash
npm start
```

## Autenticação

Para acessar as rotas protegidas, obtenha um token JWT:

- **GET /v1/auth**
  - Retorna um token JWT válido por 1 hora.

Inclua o token no header das requisições:

```
Authorization: Bearer <seu_token>
```

## Rotas da API

### Posts

- **GET /v1/posts** — Lista todos os posts
- **GET /v1/posts/search?title=&content=&author=** — Busca posts por critérios (parâmetros opcionais)
- **GET /v1/posts/:id** — Busca um post pelo ID
- **POST /v1/posts** — Cria um novo post
- **PUT /v1/posts/:id** — Atualiza um post existente
- **DELETE /v1/posts/:id** — Remove um post

> Todas as rotas acima exigem autenticação via JWT.

### Exemplo de Requisição para Criar Post

**POST /v1/posts**

Header:
```
Authorization: Bearer <seu_token>
Content-Type: application/json
```

Body:
```json
{
  "title": "Meu Post",
  "content": "Conteúdo do post",
  "author": "Grupo de Estudos"
}
```

## Observações

- Certifique-se de que o MongoDB está em execução e a URI está correta.
- O token JWT expira em 1 hora.
- Todas as respostas são em formato JSON.
