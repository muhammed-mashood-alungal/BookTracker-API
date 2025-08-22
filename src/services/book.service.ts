import {
  eq,
  ilike,
  InferInsertModel,
  InferSelectModel,
} from "drizzle-orm";
import { db } from "../db";
import { books } from "../models";
import { IGetAllQuery } from "../types/common.types";
import { findOneBy } from "../utils";

export class BookService {
  async createBook(bookDetails: InferInsertModel<typeof books>) {
    const [newBook] = await db.insert(books).values(bookDetails).returning();
    return newBook;
  }

  async getBooks({ limit, search, skip }: IGetAllQuery) {

    const searchTerm = search ? `%${search}%` : undefined;

    let query = db
      .select()
      .from(books)
      .where(eq(books.isDeleted, false))
      .$dynamic();

    if (searchTerm) {
      query = query.where(ilike(books.title, searchTerm));
    }

    if (skip) {
      query = query.offset(Number(skip));
    }

    if (limit) {
      query = query.limit(Number(limit));
    }

    const allBooks = await query;

    return allBooks;
  }

  async getBook(bookId: string) {
    return await findOneBy(books, [eq(books.id, bookId) , eq(books.isDeleted,false)]);
  }

  async updateBook(
    bookId: string,
    newBookData: Partial<InferSelectModel<typeof books>>
  ) {
    const [updatedBook] =  await db.update(books).set(newBookData).where(eq(books.id, bookId)).returning();
    return updatedBook
  }

  async deleteBook(bookId: string) {
    await db
      .update(books)
      .set({ isDeleted: true })
      .where(eq(books.id, bookId));
  }
  async restoreBook(bookId: string) {
    await db
      .update(books)
      .set({ isDeleted: false })
      .where(eq(books.id, bookId)).returning();
  }
}
