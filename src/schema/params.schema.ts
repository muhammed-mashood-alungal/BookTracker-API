import z from "zod";

export const bookIdParams = z.object({
   bookId: z
    .string()
    .nonempty({ message: "ID is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "ID must be a valid",
    })
    .transform((val) => Number(val)),
});
