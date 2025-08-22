import Elysia, { t } from "elysia";
import { BookService } from "../services";
import { Book } from "../schema";

const bookService = new BookService();

export const bookApp = new Elysia({ prefix: "/books" })
  .get("/", () => {
    return "ALL SET";
  })
  .post("/", async({ body }) => {
    const bookDetails = Book.parse(body);
    const newBook =  await bookService.addNewBook(bookDetails);
    return newBook;
  })
  .put("/", ({ body }) => {
    return "PUT";
  })
  .delete("/", ({ body }) => {})
  .get("/:bookId", ({ body }) => {});
