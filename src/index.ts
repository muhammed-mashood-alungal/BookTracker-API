import { Elysia } from "elysia";
import { checkDbConnection } from "./utils";
import { bookApp } from "./routes";
import { HttpError } from "./exceptions";
import { errorResponse } from "./utils/response.util";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const app = new Elysia()
  .error("HTTP_ERROR", HttpError)
  .onError(({ code, error, set }) => {
    if (error instanceof HttpError) {
      set.status = error.status;
      errorResponse(error.status, error.message);
    }
    set.status = StatusCodes.INTERNAL_SERVER_ERROR;
    errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
  })
  .get("/", () => "Hello Elysia")
  .use(bookApp)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

checkDbConnection();
