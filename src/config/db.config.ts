import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const connectionString = `postgres://postgres:123@localhost:5432/book_tracker_db`;

const client = postgres(connectionString);
export const db = drizzle(client);

export async function checkDbConnection() {
  try {
    await db.execute("SELECT 1");
    console.log("DB connection Ready");
  } catch (err) {
    console.error("DB connection failed", err);
    process.exit(1);
  }
}
