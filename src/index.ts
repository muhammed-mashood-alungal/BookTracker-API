import { Elysia } from "elysia";
import { checkDbConnection } from "./utils";
import { bookApp } from "./routes";
import { HttpError } from "./exceptions";
import { env } from "./config";
import { errorHandler } from "./exceptions";

const app = new Elysia({prefix : '/api/v1'})
  .error("HTTP_ERROR", HttpError)
  .onError(errorHandler)
  .use(bookApp)
  .listen(env.PORT!);

console.log(
  `🦊 Elysia is running at - ${app.server?.hostname}:${app.server?.port}`
);

checkDbConnection();
