import {
  pgTable,
  varchar,
  pgEnum,
  timestamp,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";

export const bookStatusEnum = pgEnum("status", [
  "not_started",
  "in_progress",
  "finished",
]);

export const books = pgTable("books", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 50 }).notNull(),
  author: varchar("author", { length: 50 }).notNull(),
  status: bookStatusEnum("status").default("not_started"),
  isDeleted: boolean("is_deleted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
