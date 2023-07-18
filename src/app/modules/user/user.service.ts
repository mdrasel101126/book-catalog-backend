import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwt.helpers";
import { IUser, IUserCreateResponse } from "./user.interface";
import { User } from "./user.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createUser = async (payload: IUser): Promise<IUserCreateResponse> => {
  const user = await User.create(payload);
  const accessToken = jwtHelpers.createToken(
    { email: user.email, _id: user._id },
    config.jwt.sectret as Secret,
    config.jwt.expires_in as string
  );
  return { user, accessToken };
};

const loginUser = async (
  payload: Pick<IUser, "email" | "password">
): Promise<IUserCreateResponse> => {
  const user = await User.findOne({ email: payload.email });
  console.log(user);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid password!");
  }
  const accessToken = jwtHelpers.createToken(
    { email: user.email, _id: user._id },
    config.jwt.sectret as Secret,
    config.jwt.expires_in as string
  );
  return { accessToken, user: user };
};

const getProfile = async (id: string): Promise<IUser | null> => {
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  return isUserExist;
};

export const UserService = {
  createUser,
  loginUser,
  getProfile,
};
