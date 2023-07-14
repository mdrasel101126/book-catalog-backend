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

export const BookRoute = router;
