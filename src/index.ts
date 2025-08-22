import { Elysia } from "elysia";
import { checkDbConnection } from "./config/db.config";
import dotenv from 'dotenv';

dotenv.config();

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


checkDbConnection()