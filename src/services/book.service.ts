import { eq, ilike, InferInsertModel, InferSelectModel } from "drizzle-orm";
import { books } from "../models";
import { IGetAllQuery } from "../types";
import { findOneBy } from "../utils";
import { HttpError } from "../exceptions";
import { ERROR_RESPONSE } from "../constants";
import { StatusCodes } from "http-status-codes";
import { db } from "../config";

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

  async getBook(bookId: number) {
    const book = await findOneBy(books, [
      eq(books.id, bookId),
      eq(books.isDeleted, false),
    ]);
    if (!book) {
      throw new HttpError(ERROR_RESPONSE.BOOK_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    return book;
  }

  async updateBook(
    bookId: number,
    newBookData: Partial<InferSelectModel<typeof books>> = {}
  ) {
    if (Object.keys(newBookData).length === 0) {
      throw new HttpError(
        ERROR_RESPONSE.NO_DATA_TO_UPDATE,
        StatusCodes.BAD_REQUEST
      );
    }

    const [updatedBook] = await db
      .update(books)
      .set(newBookData)
      .where(eq(books.id, bookId))
      .returning();
    return updatedBook;
  }

  async deleteBook(bookId: number) {
    await db.update(books).set({ isDeleted: true }).where(eq(books.id, bookId));
  }
  async restoreBook(bookId: number) {
    await db
      .update(books)
      .set({ isDeleted: false })
      .where(eq(books.id, bookId))
      .returning();
  }
}
