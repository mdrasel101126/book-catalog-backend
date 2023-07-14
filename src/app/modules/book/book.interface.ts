/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type IBook = {
  title: string;
  author: Types.ObjectId | IUser;
  genre: string;
  publicationDate: string;
};

export type BookModel = {
  isBookExist(id: string): Promise<IBook>;
} & Model<IBook>;
