import * as z from "zod";

export const NoteCreateSchema = z.object({
  content: z.string().min(3),
});
