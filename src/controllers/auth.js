import jwt from "jsonwebtoken";
import { authUser, changePWD, updatePassword } from "../models/index.js";
import { SECRET_KEY } from "../config.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "账号不能为空" });
  } else if (!password) {
    return res.status(400).json({ message: "密码不能为空" });
  }

  try {
    // 从数据库中查找用户
    const user = await authUser(email, password);

    if (!user) {
      return res.status(401).json({ message: "账号或密码错误" });
    }

    // 生成 JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "7d",
    });
    return res.json({ token });
  } catch {
    return res.status(500).json({ message: "服务器错误" });
  }
};

export const changepwd = async (req, res) => {
  const { email, oldpwd, newpwd } = req.body;
  try {
    const currentPassword = await changePWD(email);

    // 如果需要验证旧密码，可以在这里进行
    if (!oldpwd) {
      return res.status(400).json({ message: "旧密码不能为空" });
    }
    if (!newpwd) {
      return res.status(400).json({ message: "新密码不能为空" });
    }
    if (currentPassword !== oldpwd) {
      return res.status(400).json({ message: "旧密码不正确" });
    }
    updatePassword(email, newpwd);
    return res.status(200).json({ message: "密码更新成功" });
  } catch {
    return res.status(500).json({ message: "服务器错误" });
  }
};
