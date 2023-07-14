import { Router } from "express";

const router = Router();

const moduleRoutes = [
  {
    path: "",
    route: "",
  },
];
moduleRoutes.map((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.route)
);

export default router;
