import * as z from "zod";

export const ListQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((val) => (val !== undefined ? Number(val) : undefined))
    .refine((val) => val === undefined || (!isNaN(val) && val >= 0), {
      message: "Limit must be a positive number",
    }),
  skip: z
    .string()
    .optional()
    .transform((val) => (val !== undefined ? Number(val) : undefined))
    .refine((val) => val === undefined || (!isNaN(val) && val >= 0), {
      message: "Skip must be a positive number",
    }),
  search: z.string().optional(),
});
