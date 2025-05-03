import { randomUUID } from "crypto";

class DatabaseMemory {
    #pessoas = new Map();

    list(search) {
        return Array.from(this.#pessoas.entries()).map((pessoaArray) =>{
            const id = pessoaArray[0];
            const data = pessoaArray[1];

            return {
                id,
                ...data,
            }
        }).filter(pessoa => {
            if (search)
                return pessoa.nome.includes(search);

            return true;
        });
    }

    create(pessoa) {
        const pessoaId = randomUUID();
        this.#pessoas.set(pessoaId, pessoa);

    }

    update(id, pessoa) {
        this.#pessoas.set(id, pessoa);
        
    }

    delete(id, pessoa) {
        this.#pessoas.delete(id, pessoa);
        
    }
};

export default DatabaseMemory;