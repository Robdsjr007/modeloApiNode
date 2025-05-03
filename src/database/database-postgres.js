import { randomUUID } from "crypto";
import { sql } from "./db.js";

class DatabasePostgres {
   async list(search) {
        let pessoas;

        if (search) {
           pessoas = await sql`select * from pessoa where nome ilike ${'%' + search + '%'};`;
        } else {
            pessoas = await  sql`select * from pessoa;`;
        }

        return pessoas;
    };

    async create(pessoa) {
        const pessoaId = randomUUID();
        const { nome, idade, criacao } = pessoa;

        await sql`insert into pessoa (id, nome, idade, criacao) VALUES (${pessoaId}, ${nome}, ${idade}, ${criacao});`;
    };

    async update(id, pessoa) {
        const { nome, idade} = pessoa;

        await sql`update pessoa set nome = ${nome}, idade = ${idade} WHERE id = ${id};`;

    };

    async delete(id) {
        await sql`delete from pessoa WHERE id = ${id};`;
    };
};

export  { DatabasePostgres };