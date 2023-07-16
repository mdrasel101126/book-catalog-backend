import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IBook, ISingleBookResponse } from "./book.interface";
import { BookService } from "./book.service";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constants";
import { paginationFields } from "../../../constants/pagination";
import { IGenericResponse } from "../../../interfaces/common";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.createBook(req.body);
  return sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book created successfully",
    data: result,
  });
});

const getBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BookService.getBooks(filters, paginationOptions);
  return sendResponse<IGenericResponse<IBook[]>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrived successfully",
    data: result,
  });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getSingleBook(req.params?.id);
  return sendResponse<ISingleBookResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrived successfully",
    data: result,
  });
});

export const BookController = {
  createBook,
  getBooks,
  getSingleBook,
};
