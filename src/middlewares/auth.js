import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "当前用户未登录" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "token无效或已过期" });
    }
    req.user = user;
    next();
  });
};
