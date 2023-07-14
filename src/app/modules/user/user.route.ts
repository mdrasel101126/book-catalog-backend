import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";

const router = Router();

router.post(
  "/create-user",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);
router.post(
  "/login-user",
  validateRequest(UserValidation.loginUserZodSchema),
  UserController.loginUser
);

export const UserRoute = router;
