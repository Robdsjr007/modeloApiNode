import { sql } from "./db.js";

// sql`DROP TABLE IF EXISTS pessoa;`.then(() => {
//     console.log("tabela apagada");
// })

sql`
    CREATE TABLE IF NOT EXISTS pessoa (
        id      TEXT PRIMARY KEY,
        nome    TEXT,
        idade   INTEGER,
        criacao TEXT    
    );
`.then(() => {
    console.log("Tabela criada")
});