import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../config";


const connectionString = env.DB_CONNECTION_URL!;
const client = postgres(connectionString);
export const db = drizzle(client);

 