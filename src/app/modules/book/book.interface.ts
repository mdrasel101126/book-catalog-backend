/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";
import { IReview } from "../review/review.interface";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  posterId: Types.ObjectId | IUser;
};

export type BookModel = {
  isBookExist(id: string): Promise<IBook>;
} & Model<IBook>;

export type IBookFilters = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
  publicationDate?: string;
};

export type ISingleBookResponse = {
  book: IBook;
  reviews: IReview[];
};
