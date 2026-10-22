import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres@localhost:5432/reza_portfolio?schema=public",
  max: 10,
  idleTimeoutMillis: 30000,
});

export default pool;
