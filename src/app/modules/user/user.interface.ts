/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type IUser = {
  name: string;
  email: string;
  password: string;
};

export type UserModel = {
  isUserExist(id: string): Promise<IUser>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
