import { Elysia } from "elysia";
import { checkDbConnection } from "./utils";



const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


checkDbConnection()