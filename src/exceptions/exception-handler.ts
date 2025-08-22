import { ZodError } from "zod";
import { errorResponse } from "../utils";
import { HttpError } from "./http-exception";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ERROR_RESPONSE } from "../constants";

export const errorHandler = ({ error, set }: any) => {
  console.log(error);

  if (error instanceof HttpError) {
    set.status = error.status;
    return errorResponse(error.status, error.message);
  }
  if (error instanceof ZodError) {
    set.status = StatusCodes.BAD_REQUEST;
    return errorResponse(
      StatusCodes.BAD_REQUEST,
      ERROR_RESPONSE.BACKEND_VALIDATION_FAILED,
      error.message
    );
  }

  set.status = StatusCodes.INTERNAL_SERVER_ERROR;
  return errorResponse(
    StatusCodes.INTERNAL_SERVER_ERROR,
    ReasonPhrases.INTERNAL_SERVER_ERROR
  );
};
