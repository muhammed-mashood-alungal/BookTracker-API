import * as z from "zod";
import { ERROR_RESPONSE } from "../constants";

export const ListQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((val) => (val !== undefined ? Number(val) : undefined))
    .refine((val) => val === undefined || (!isNaN(val) && val >= 0), {
      message: ERROR_RESPONSE.LIMIT_MUST_NUMNER,
    }),
  skip: z
    .string()
    .optional()
    .transform((val) => (val !== undefined ? Number(val) : undefined))
    .refine((val) => val === undefined || (!isNaN(val) && val >= 0), {
      message: ERROR_RESPONSE.SKIP_MUST_NUMBER,
    }),
  search: z.string().optional(),
});
