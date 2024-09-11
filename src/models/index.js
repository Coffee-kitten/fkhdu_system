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

// 密码修改
export const changePWD = async (email) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      password: true,
    },
  });
  return user.password;
};

export const updatePassword = async (email, newPassword) => {
  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: newPassword,
    },
  });
};
export const TransactionType = {
  INCOME: "收入",
  EXPENSE: "支出",
};

// 创建新交易记录
export const createTransaction = async (transactionData) => {
  return await prisma.transaction.create({
    data: {
      type: transactionData.type,
      amount: transactionData.amount,
      description: transactionData.description,
      fromAccountId: transactionData.fromAccountId,
      toAccountId: transactionData.toAccountId,
    },
  });
};

// 获取所有交易记录
export const getAllTransactions = async () => {
  return await prisma.transaction.findMany();
};

// 根据ID获取单个交易记录
export const getTransactionById = async (id) => {
  return await prisma.transaction.findUnique({
    where: { id },
  });
};

// 更新交易记录
export const updateTransaction = async (transactionData) => {
  return await prisma.transaction.update({
    where: {
      id: transactionData.id, // 使用交易记录的唯一 ID 来定位要更新的记录
    },
    data: {
      ...transactionData,
    },
  });
};

export const delTransaction = async (transactionId) => {
  return await prisma.transaction.delete({
    where: {
      id: transactionId.id,
    },
  });
};

// 删除交易记录
export const deleteTransaction = async (id) => {
  return await prisma.transaction.delete({
    where: { id },
  });
};
