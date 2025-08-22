import { eq, InferInsertModel } from "drizzle-orm";
import { books, notes } from "../models";
import { findOneBy } from "../utils";
import { HttpError } from "../exceptions";
import { ERROR_RESPONSE } from "../constants";
import { StatusCodes } from "http-status-codes";
import { db } from "../config";

export class NotesService {
  async createNoteforBook(
    bookId: number,
    noteData: Omit<InferInsertModel<typeof notes>, "bookId">
  ) {
    return await db
      .insert(notes)
      .values({ ...noteData, bookId })
      .returning();
  }

  async getNotesOfBooks(bookId: number) {
    const doc = (await findOneBy(books, [eq(books.id, bookId)], {
      isDeleted: books.isDeleted,
    })) as typeof books;

    if (!doc)
      throw new HttpError(ERROR_RESPONSE.BOOK_NOT_FOUND, StatusCodes.NOT_FOUND);

    if (doc.isDeleted) {
      throw new HttpError(
        ERROR_RESPONSE.BOOK_IS_NO_MORE_AVAILABLE,
        StatusCodes.NOT_FOUND
      );
    }

    return await db.select().from(notes).where(eq(notes.bookId, bookId));
  }
} 
