import pg from "pg";
import fs from "fs";
import path from "path";

const { Pool } = pg;

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.log("[init-db] No DATABASE_URL specified. Skipping database auto-migration.");
    return;
  }

  const isRemote =
    !connectionString.includes("localhost") &&
    !connectionString.includes("127.0.0.1");

  console.log(`[init-db] Connecting to database (${isRemote ? "Remote Cloud" : "Local"})...`);

  const pool = new Pool({
    connectionString,
    connectionTimeoutMillis: 8000,
    ...(isRemote ? { ssl: { rejectUnauthorized: false } } : {}),
  });

  try {
    const client = await pool.connect();
    console.log("[init-db] Database connected successfully.");

    // Check if tables already exist
    const checkRes = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'contact_messages'
      );
    `);

    const alreadyInitialized = checkRes.rows[0]?.exists;

    if (alreadyInitialized) {
      console.log("[init-db] Schema is already initialized. Tables are ready.");
      client.release();
      await pool.end();
      return;
    }

    console.log("[init-db] Running schema_postgres.sql to create tables and seed initial data...");
    const sqlPath = path.join(process.cwd(), "prisma", "schema_postgres.sql");

    if (!fs.existsSync(sqlPath)) {
      console.warn("[init-db] Warning: prisma/schema_postgres.sql not found.");
      client.release();
      await pool.end();
      return;
    }

    const sql = fs.readFileSync(sqlPath, "utf-8");
    await client.query(sql);

    console.log("[init-db] Tables and seeds successfully created in database!");
    client.release();
    await pool.end();
  } catch (error) {
    console.warn("[init-db] Non-fatal database init note:", error.message);
    try {
      await pool.end();
    } catch (_) {}
  }
}

main();
