import { Router } from "express";
import { login } from "../controllers/auth.js";

const router = Router();

const routes = [
  { path: "/api/v1/passport/auth/login", method: "post", handler: login },
];

routes.forEach((route) => {
  router[route.method](route.path, route.handler);
});

export const routers = router;
