import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { bookSearchableFields } from "./book.constants";
import { IBook, IBookFilters, ISingleBookResponse } from "./book.interface";
import { Book } from "./book.model";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Review } from "../review/review.model";

const createBook = async (payload: IBook): Promise<IBook> => {
  const result = await Book.create(payload);
  return result;
};
const getBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const andCoditions = [];
  const { searchTerm, ...filtersData } = filters;
  if (searchTerm) {
    andCoditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCoditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions = andCoditions.length > 0 ? { $and: andCoditions } : {};

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<ISingleBookResponse> => {
  const isBookExist = await Book.isBookExist(id);
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }
  const reviws = await Review.find({ book: id }).populate("user");

  return {
    book: isBookExist,
    reviews: reviws,
  };
};
const deleteBook = async (id: string): Promise<IBook | null> => {
  const isBookExist = await Book.isBookExist(id);
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }
  const result = await Book.findByIdAndDelete(id);
  await Review.deleteMany({ book: id });

  return result;
};
const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isBookExist = await Book.isBookExist(id);
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const BookService = {
  createBook,
  getBooks,
  getSingleBook,
  deleteBook,
  updateBook,
};
