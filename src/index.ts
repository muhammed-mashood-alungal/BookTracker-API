import { Elysia } from "elysia";
import { checkDbConnection } from "./utils";
import { bookApp } from "./routes";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(bookApp)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

checkDbConnection();
