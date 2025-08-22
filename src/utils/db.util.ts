import { db } from "../db";

export async function checkDbConnection() {
  try {
    await db.execute("SELECT 1");
    console.log("DB connection Ready");
  } catch (err) {
    console.error("DB connection failed", err);
    // process.exit(1);
  }
}
