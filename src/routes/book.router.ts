import Elysia, { t } from "elysia";
import { BookService } from "../services";
import { BookCreateSchema, BookUpdateSchema } from "../schema";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ListQuerySchema } from "../schema/common.schema";
import { errorResponse, successResponse } from "../utils/response.util";
import { bookIdParams } from "../schema/params.schema";

const bookService = new BookService();

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

  .get("/:bookId", async ({ params }) => {
    const { bookId } = bookIdParams.parse(params);
    const book = await bookService.getBook(bookId);
    if (!book) {
      return errorResponse(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
    }
    return successResponse(StatusCodes.OK, ReasonPhrases.OK, { book });
  });
