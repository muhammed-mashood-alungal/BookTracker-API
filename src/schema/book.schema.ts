import * as z from "zod";

export const BookCreateSchema = z.object({
  title: z.string().min(3),
  author: z.string().min(3),
});

export const BookUpdateSchema = z.object({
  title: z.string().min(3).optional(),
  author: z.string().min(3).optional(),
});
