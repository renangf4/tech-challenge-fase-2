# Desafio - Serviço de Notificação Interna

Uma empresa de tecnologia deseja implementar um serviço de **notificação interna**.

## Objetivo

Criar uma aplicação web com **Node.js** e **Express** que permita aos usuários:

- Adicionar notificações
- Listar notificações
- Excluir notificações

## Requisitos adicionais

- Utilizar **middlewares** para:
  - Autenticação
  - Tratamento de erros

## Observações

> ❗ Não é necessário utilizar bancos de dados para este desafio.  
> Você pode trabalhar com o **fluxo em memória**.

---
## Primeiros Passos

Para começar a usar esta aplicação, siga as instruções abaixo:

### Instalação

Primeiro, você precisará instalar as dependências do projeto. Abra seu terminal na pasta raiz do projeto e execute:

```bash
npm install
```

### Executando a Aplicação

Após a instalação, você pode iniciar a aplicação com o seguinte comando:

```bash
npm start
```

### Variáveis de Ambiente

Para que a aplicação funcione corretamente, você precisará configurar algumas variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto (se ele ainda não existir) e adicione as seguintes variáveis, substituindo os valores pelos seus próprios:

```
PORT=
DB_URI=
JWT_KEY=
```

* `PORT`: A porta em que o servidor será executado (ex: `3000`).
* `DB_URI`: A URI de conexão com o seu banco de dados.
* `JWT_KEY`: Uma chave secreta para a geração e validação de tokens JWT.

### Autenticação e Rotas

Antes de fazer requisições para a maioria das rotas, você precisará obter um **token de autenticação**.

1.  **Obter Token**: Faça uma requisição `POST` para a rota `v1/auth` para obter seu token.
2.  **Requisições Autenticadas**: Com o token em mãos, você poderá fazer requisições para as rotas de notificação, como a `v1/notifications`. Lembre-se de incluir o token no cabeçalho `Authorization` de suas requisições, no formato `Bearer [seu_token]`.

## Exemplode de Requisição (body)

{
  "title": "Teste",
  "description": "Minha primeira notificação"
}
