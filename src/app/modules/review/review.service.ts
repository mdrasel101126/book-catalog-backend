import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Book } from "../book/book.model";
import { IReview } from "./review.interface";
import { Review } from "./review.model";
import { User } from "../user/user.model";

const createReview = async (payload: IReview): Promise<IReview> => {
  const { user, book } = payload;
  const isBookExist = await Book.isBookExist(book.toString());
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book is not found!");
  }
  const isUserExist = await User.isUserExist(user.toString());
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User is not found!");
  }
  const result = await Review.create(payload);
  return result;
};

export const ReviewService = {
  createReview,
};
