import * as z from "zod";

export const Book = z.object({
  title: z.string().min(3),
  author: z.string().min(3),
});
