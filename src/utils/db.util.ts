import { and } from "drizzle-orm";
import { db } from "../db";

export async function checkDbConnection() {
  try {
    await db.execute("SELECT 1");
    console.log("DB connection Ready");
  } catch (err) {
    console.error("DB connection failed", err);
  }
}

export const findOneBy = async <T>(
  table: any,
  condition: any,
  select: any = {}
): Promise<T | null> => {
  const result = await db
    .select(Object.keys(select).length ? select : undefined)
    .from(table)
    .where(and(...condition))
    .limit(1);
  return result[0] || null;
};
