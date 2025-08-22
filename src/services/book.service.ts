import { InferInsertModel } from "drizzle-orm";
import { db } from "../db";
import { books } from "../models";

export class BookService {
  async addNewBook(bookDetails: InferInsertModel<typeof books>) {
    const newBook = await db.insert(books).values(bookDetails);
    return newBook;
  }
}
