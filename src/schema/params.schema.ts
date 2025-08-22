import z from "zod";
import { ERROR_RESPONSE } from "../constants";

export const bookIdParams = z.object({
  bookId: z
    .string()
    .nonempty({ message: ERROR_RESPONSE.ID_REQUIRED })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: ERROR_RESPONSE.INVALID_ID,
    })
    .transform((val) => Number(val)),
});
