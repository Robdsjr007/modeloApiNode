import { fastify } from 'fastify';
import DatabasePostgres from './database-postgres.js';

const server = fastify();

const database = new DatabasePostgres();


server.post('/pessoas', async (req, res)=> {
    const {nome, idade} = req.body;
    // verifico se os dados são válidos
    if (!nome & !idade)
        return res.status(400).send("Dados inválidos!");
    // Crio um objeto com os valores do corpo da requisição
    // await, espera a execução do script sql para continuar
    await database.create({
        "nome": nome,
        "idade": idade,
        "criacao": Date.now().toString()
    });
    // Retorna apenas o status de criação
    return res.status(201).send();
});

// Query parameter é opcional
server.get('/pessoas', async (req, res) => {
    // Pego o valor de search dentro do query parameter
   const { search } = req.query;
    // await, espera a execução do script sql para continuar
   const pessoas = await database.list(search);
   // Retorna todas as pessoas
   return res.send(pessoas);
});

server.put('/pessoas/:id', async (req, res) => {
    // Pega o valor id do parametro
    const { id } = req.params;
    const {nome, idade} = req.body;
    // verifico se os dados são válidos
    if (!nome & !idade)
        return res.status(400).send("Dados inválidos!");

    await database.update(id, {
        nome,
        idade
    });
    return res.status(204).send();
});

server.delete('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    database.delete(id);
    return res.status(204).send();
});

server.listen({
    port: process.env.PORT ?? 3333,
});