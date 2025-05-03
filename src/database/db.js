import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config(); // carrega as variáveis de ambiente

const sql = neon(process.env.DATABASE_URL);

export { sql };
