import {
  createTransaction,
  getAllTransactions,
  TransactionType,
  updateTransaction,
  delTransaction,
} from "../models/index.js";
export const createTransactionController = async (req, res) => {
  const { type, amount } = req.body;
  if (!type || !amount) {
    return res.status(400).json({ message: "类型和金额是必填项" });
  }

  if (!Object.values(TransactionType).includes(type)) {
    return res.status(400).json({ message: "无效的交易类型" });
  }
  try {
    const transaction = await createTransaction(req.body);
    res.status(201).json(transaction);
  } catch {
    res.status(500).json({ message: "服务器错误" });
  }
};

export const getTransactionsController = async (req, res) => {
  try {
    const transactions = await getAllTransactions();
    res.status(200).json(transactions);
  } catch {
    res.status(500).json({ message: "服务器错误" });
  }
};

export const postChangeTransaction = async (req, res) => {
  try {
    await updateTransaction(req.body);
    res.status(201).json({ message: "修改成功" });
  } catch {
    res.status(500).json({ message: "服务器错误" });
  }
};

export const postDelTransaction = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "序号是必填项！" });
  }
  try {
    await delTransaction(req.body);
    res.status(201).json({ message: "删除成功" });
  } catch {
    res.status(500).json({ message: "服务器错误" });
  }
};
