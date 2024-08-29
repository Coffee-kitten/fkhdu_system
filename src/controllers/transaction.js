import {
  createTransaction,
  getAllTransactions,
  TransactionType,
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
  } catch (error) {
    res.status(500).json({ message: "服务器错误", error });
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
