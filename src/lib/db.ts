import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const isRemote =
  typeof connectionString === "string" &&
  !connectionString.includes("localhost") &&
  !connectionString.includes("127.0.0.1");

const pool = new Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 30000,
  ...(isRemote ? { ssl: { rejectUnauthorized: false } } : {}),
});

export default pool;
