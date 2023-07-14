import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { BookRoute } from "../modules/book/book.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoute,
  },
  {
    path: "/books",
    route: BookRoute,
  },
];
moduleRoutes.map((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.route)
);

export default router;
