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

export const TransactionType = {
  INCOME: "收入",
  EXPENSE: "支出",
  TRANSFER: "转账",
  BORROW: "借入",
  LEND: "借出",
  DEBT_COLLECTION: "收债",
  DEBT_PAYMENT: "还债",
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
export const updateTransaction = async (id, transactionData) => {
  return await prisma.transaction.update({
    where: { id },
    data: transactionData,
  });
};

// 删除交易记录
export const deleteTransaction = async (id) => {
  return await prisma.transaction.delete({
    where: { id },
  });
};
