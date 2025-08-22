import {
  pgTable,
  timestamp,
  text,
  char,
  serial,
  integer,
} from "drizzle-orm/pg-core";
import { books } from "./book.model";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id")
    .references(() => books.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
