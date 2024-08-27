import jwt from "jsonwebtoken";
import { users } from "../models/index.js";
import { SECRET_KEY } from "../config.js";

export const login = (req, res) => {
  const { name, password } = req.query;

  if (!name) {
    return res.status(400).json({ message: "账号不能为空" });
  } else if (!password) {
    return res.status(400).json({ message: "密码不能为空" });
  }

  const user = users.find((u) => u.name === name && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "账号或密码错误" });
  }

  const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, {
    expiresIn: "1h",
  });
  return res.json({ token });
};
