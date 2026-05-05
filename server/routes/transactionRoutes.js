const express = require("express");
const router = express.Router();
const { deleteTransaction } = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

const {
  addTransaction,
  getTransactions,
  getSummary,
} = require("../controllers/transactionController");

// 🔐 protected routes
router.post("/", authMiddleware, addTransaction);
router.get("/", authMiddleware, getTransactions);
router.get("/summary", authMiddleware, getSummary);
router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;