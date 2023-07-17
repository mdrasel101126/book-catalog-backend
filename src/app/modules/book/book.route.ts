import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookValidation } from "./book.validation";
import { BookController } from "./book.controller";

const router = Router();

router.post(
  "/create-book",
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);
router.patch("/:id", BookController.updateBook);
router.delete("/:id", BookController.deleteBook);
router.get("/", BookController.getBooks);
router.get("/:id", BookController.getSingleBook);

export const BookRoute = router;
