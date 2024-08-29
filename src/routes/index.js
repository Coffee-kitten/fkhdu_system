import { Router } from "express";
import { login } from "../controllers/auth.js";
import {
  createTransactionController,
  getTransactionsController,
} from "../controllers/transaction.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = Router();

const routes = [
  { path: "/api/v1/passport/auth/login", method: "post", handler: login },
  {
    path: "/api/v1/user/transaction",
    method: "post",
    middlewares: [authenticateToken],
    handler: createTransactionController,
  },
  {
    path: "/api/v1/user/transaction",
    method: "post",
    middlewares: [authenticateToken],
    handler: createTransactionController,
  },
  {
    path: "/api/v1/user/transaction/fetch",
    method: "get",
    middlewares: [authenticateToken],
    handler: getTransactionsController,
  },
];

routes.forEach((route) => {
  if (route.middlewares) {
    router[route.method](route.path, ...route.middlewares, route.handler);
  } else {
    router[route.method](route.path, route.handler);
  }
});

export const routers = router;
