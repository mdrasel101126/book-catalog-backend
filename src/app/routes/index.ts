import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoute,
  },
];
moduleRoutes.map((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.route)
);

export default router;
