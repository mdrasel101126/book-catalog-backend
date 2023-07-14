import { IUser } from "./user.interface";
import { User } from "./user.schema";

const createUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};

export const UserService = {
  createUser,
};
