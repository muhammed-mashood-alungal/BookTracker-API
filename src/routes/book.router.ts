import Elysia, { t } from "elysia";
import { BookService, NotesService } from "../services";
import { BookCreateSchema, BookUpdateSchema } from "../schema";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ListQuerySchema } from "../schema/common.schema";
import { successResponse } from "../utils/response.util";
import { bookIdParams } from "../schema/params.schema";
import { NoteCreateSchema } from "../schema/note.schema";

const bookService = new BookService();
const noteService = new NotesService();

export const bookApp = new Elysia({ prefix: "/books" })

  .get("/", async ({ query }) => {
    const listQuery = ListQuerySchema.parse(query);
    const books = await bookService.getBooks(listQuery);
    return successResponse(StatusCodes.OK, ReasonPhrases.OK, { books });
  })

  .post("/", async ({ body }) => {
    const bookDetails = BookCreateSchema.parse(body);
    const newBook = await bookService.createBook(bookDetails);
    return successResponse(StatusCodes.CREATED, ReasonPhrases.CREATED, {
      newBook,
    });
  })

  .put("/:bookId", async ({ body, params }) => {
    const bookDetails = BookUpdateSchema.parse(body);
    const { bookId } = bookIdParams.parse(params);
    const updatedBook = await bookService.updateBook(bookId, bookDetails);
    return successResponse(StatusCodes.OK, ReasonPhrases.OK, { updatedBook });
  })

  .delete("/:bookId", async ({ params }) => {
    const { bookId } = bookIdParams.parse(params);
    await bookService.deleteBook(bookId);
    return successResponse(StatusCodes.NO_CONTENT, ReasonPhrases.OK);
  })

  .patch("/:bookId/restore", async ({ params }) => {
    const { bookId } = bookIdParams.parse(params);
    await bookService.restoreBook(bookId);
    return successResponse(StatusCodes.NO_CONTENT, ReasonPhrases.OK);
  })

  .get("/:bookId/notes", async ({ params }) => {
    const { bookId } = bookIdParams.parse(params);
    const notes = await noteService.getNotesOfBooks(bookId);
    return successResponse(StatusCodes.OK, ReasonPhrases.OK, { notes });
  })

  .post("/:bookId/notes", async ({ params, body }) => {
    const { bookId } = bookIdParams.parse(params);
    const noteDetails = NoteCreateSchema.parse(body);
    const newNote = await noteService.createNoteforBook(bookId, noteDetails);
    return successResponse(StatusCodes.OK, ReasonPhrases.OK, { newNote });
  })

  .get("/:bookId", async ({ params }) => {
    const { bookId } = bookIdParams.parse(params);
    const book = await bookService.getBook(bookId);
    return successResponse(StatusCodes.OK, ReasonPhrases.OK, { book });
  });
