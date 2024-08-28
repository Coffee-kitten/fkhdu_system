import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 用户登录查询
export const authUser = async (email, password) => {
  return await prisma.user.findFirst({
    where: {
      email,
      password,
    },
  });
};
