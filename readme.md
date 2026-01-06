[Documentação Interativa da API](https://apiblogpost.apidog.io/)

# API de Gerenciamento de Posts

Este projeto é uma API RESTful desenvolvida em **Node.js** e **Express** para gerenciar posts. Os dados são armazenados em um banco de dados **MongoDB** e o acesso às rotas é protegido por autenticação JWT.

## Funcionalidades

- Autenticação de usuários (professores e alunos)
- Gerenciamento de professores (CRUD completo)
- Gerenciamento de alunos (CRUD completo)
- Adicionar posts
- Listar todos os posts
- Buscar posts por critérios (título, conteúdo, autor)
- Buscar post por ID
- Atualizar post
- Excluir post
- Controle de permissões (professores podem criar/editar/excluir, alunos apenas visualizam)

## Modelo de Dados

### Post

Cada post possui os seguintes campos:

- `title` (string, obrigatório): Título do post
- `content` (string, obrigatório): Conteúdo do post
- `author` (string, obrigatório): Autor do post
- `createdAt` (date, gerado automaticamente): Data de criação

### Professor

- `name` (string, obrigatório): Nome do professor
- `email` (string, obrigatório, único): Email do professor
- `password` (string, obrigatório): Senha (criptografada)
- `createdAt` (date, gerado automaticamente): Data de criação

### Aluno

- `name` (string, obrigatório): Nome do aluno
- `email` (string, obrigatório, único): Email do aluno
- `password` (string, obrigatório): Senha (criptografada)
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

Para acessar as rotas protegidas, realize login:

- **POST /v1/auth/login**
  - Realiza login de professor ou aluno
  - Retorna um token JWT válido por 24 horas

Body:
```json
{
  "email": "professor@exemplo.com",
  "password": "senha123"
}
```

Resposta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123456789",
    "name": "Nome do Usuário",
    "email": "professor@exemplo.com",
    "userType": "teacher"
  }
}
```

Inclua o token no header das requisições:

```
Authorization: Bearer <seu_token>
```

### Permissões

- **Professores**: Podem criar, editar e excluir posts. Podem gerenciar professores e alunos.
- **Alunos**: Podem apenas visualizar posts (GET).

## Rotas da API

### Autenticação

- **POST /v1/auth/login** — Realiza login e retorna token JWT

### Posts

- **GET /v1/posts** — Lista todos os posts (professores e alunos)
- **GET /v1/posts/search?title=&content=&author=** — Busca posts por critérios (parâmetros opcionais) (professores e alunos)
- **GET /v1/posts/:id** — Busca um post pelo ID (professores e alunos)
- **POST /v1/posts** — Cria um novo post (apenas professores)
- **PUT /v1/posts/:id** — Atualiza um post existente (apenas professores)
- **DELETE /v1/posts/:id** — Remove um post (apenas professores)

### Professores

- **GET /v1/teachers?page=1&limit=10** — Lista todos os professores (paginação) (apenas professores)
- **GET /v1/teachers/:id** — Busca um professor pelo ID (apenas professores)
- **POST /v1/teachers** — Cria um novo professor (apenas professores)
- **PUT /v1/teachers/:id** — Atualiza um professor existente (apenas professores)
- **DELETE /v1/teachers/:id** — Remove um professor (apenas professores)

### Alunos

- **GET /v1/students?page=1&limit=10** — Lista todos os alunos (paginação) (apenas professores)
- **GET /v1/students/:id** — Busca um aluno pelo ID (apenas professores)
- **POST /v1/students** — Cria um novo aluno (apenas professores)
- **PUT /v1/students/:id** — Atualiza um aluno existente (apenas professores)
- **DELETE /v1/students/:id** — Remove um aluno (apenas professores)

> Todas as rotas acima exigem autenticação via JWT.

### Exemplos de Requisições

#### Criar Post

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

#### Criar Professor

**POST /v1/teachers**

Header:
```
Authorization: Bearer <seu_token>
Content-Type: application/json
```

Body:
```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "senha123"
}
```

#### Criar Aluno

**POST /v1/students**

Header:
```
Authorization: Bearer <seu_token>
Content-Type: application/json
```

Body:
```json
{
  "name": "Maria Santos",
  "email": "maria@exemplo.com",
  "password": "senha123"
}
```

#### Listar Professores (com paginação)

**GET /v1/teachers?page=1&limit=10**

Header:
```
Authorization: Bearer <seu_token>
```

Resposta:
```json
{
  "data": [...],
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

## Observações

- Certifique-se de que o MongoDB está em execução e a URI está correta.
- O token JWT expira em 24 horas.
- Todas as respostas são em formato JSON.
- Senhas são criptografadas usando bcrypt antes de serem salvas no banco de dados.
- Apenas professores podem realizar operações de criação, edição e exclusão de posts, professores e alunos.
- Alunos podem apenas visualizar posts.
