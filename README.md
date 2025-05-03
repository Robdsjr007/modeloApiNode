
# 📚 API de Pessoas - Fastify + PostgreSQL

Esta API permite o gerenciamento de registros de pessoas, com operações de **CRUD** completo. Documentação interativa está disponível na rota `/docs`.

---

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Zod](https://zod.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/) (via Fastify Swagger)

---

## 📂 Estrutura do Projeto

```bash
src/
├── controllers/
├── services/
├── models/
├── routes/
├── database/
└── server.js
```

---

## 🔗 Documentação Swagger

Acesse a documentação interativa:

```
GET /docs
```

---

## 🛠️ Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/api-pessoas.git
cd api-pessoas

# Instalar dependências
npm install

# Criar banco e tabelas
node src/database/create-table.js

# Rodar a API
node src/server.js
```

---

## 📮 Rotas da API

### ✅ GET `/pessoas`

Lista todas as pessoas. Permite busca opcional por nome:

```bash
GET /pessoas?search=nome
```

---

### ✳️ POST `/pessoas`

Cria uma nova pessoa.

**Body JSON:**
```json
{
  "nome": "João",
  "idade": 25
}
```

---

### 🔄 PUT `/pessoas/:id`

Atualiza uma pessoa.

**Body JSON:**
```json
{
  "nome": "Maria",
  "idade": 30
}
```

---

### ❌ DELETE `/pessoas/:id`

Remove uma pessoa pelo ID.

---

## ⚙️ Variáveis de Ambiente `.env`

Crie um arquivo `.env` com as configurações do banco:

```
PG_HOST=localhost
PG_PORT=5432
PG_USER=seu_usuario
PG_PASSWORD=sua_senha
PG_DATABASE=seu_banco
```

---

## 🧪 Testes manuais

Use o arquivo `routes.http` no VS Code com a extensão **REST Client** para testar suas rotas diretamente.

---

## ✍️ Autor

Desenvolvido por **Robson Dias de Santana Junior**

---

## 📃 Licença

[MIT](LICENSE)
