import { z } from 'zod';
import { DatabasePostgres } from '../database/database-postgres.js';

const database = new DatabasePostgres();

async function pessoaRoutes(app) {
    // GET - Listar pessoas
    app.get('/pessoas', {
        schema: {
            tags: ['pessoas'],
            description: 'Lista todas as pessoas',
            querystring: z.object({
                search: z.string().optional(),
            }),
            response: {
                200: z.array(z.object({
                    id: z.string(),
                    nome: z.string(),
                    idade: z.number().gte(5),
                    criacao: z.string()
                })),
            }
        }
    }, async (req, res) => {
        const { search } = req.query;
        const pessoas = await database.list(search);
        return res.status(200).send(pessoas);
    });

    // POST - Criar pessoa
    app.post('/pessoas', {
        schema: {
            tags: ['pessoas'],
            description: 'Cria uma nova pessoa',
            body: z.object({
                nome: z.string(),
                idade: z.number().gte(5),
            }),
            response: {
                201: z.null().describe("Pessoa criada"),
            },
        }
    }, async (req, res) => {
        if (!req.body)
            return res.status(400).send("Não há dados ou dados passados incorretamente!");

        const { nome, idade } = req.body;

        await database.create({
            nome,
            idade,
            criacao: Date.now().toString()
        });

        return res.status(201).send();
    });

    // PUT - Atualizar pessoa
    app.put('/pessoas/:id', {
        schema: {
            tags: ['pessoas'],
            description: 'Atualiza uma pessoa existente',
            params: z.object({
                id: z.string().uuid('ID inválido, precisa ser UUID'), // opcionalmente com validação UUID
            }),
            body: z.object({
                nome: z.string(),
                idade: z.number().gte(5),
            }),
            response: {
                204: z.null().describe("Pessoa atualizada"),
            },
        }
    }, async (req, res) => {
        const { id } = req.params;
        const { nome, idade } = req.body;

        if (!nome || !idade)
            return res.status(400).send("Dados inválidos!");

        await database.update(id, {
            nome,
            idade
        });

        return res.status(204).send();
    });

    // DELETE - Remover pessoa
    app.delete('/pessoas/:id', {
        schema: {
            tags: ['pessoas'],
            description: 'Remove uma pessoa pelo ID',
            params: z.object({
                id: z.string().uuid(), // ou só .string() se o ID não for UUID
            }),
            response: {
                204: z.null().describe("Pessoa removida"),
            },
        }
    }, async (req, res) => {
        const { id } = req.params;

        await database.delete(id);

        return res.status(204).send();
    });
};

export { pessoaRoutes };
