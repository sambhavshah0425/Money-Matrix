const Transaction = require("../models/Transaction");

// ADD TRANSACTION
exports.addTransaction = async (req, res) => {
  try {
    console.log("USER:", req.user); // ✅ DEBUG (can remove later)

    const { type, amount, category, description, date } = req.body;

    const transaction = new Transaction({
      userId: req.user.id,                // 🔐 user link
      type,
      amount: Number(amount),             // ✅ IMPORTANT FIX
      category,
      description,
      date: date ? new Date(date) : Date.now(), // ✅ correct date handling
    });

    await transaction.save();

    res.status(201).json(transaction);
  } catch (err) {
    console.log("ADD ERROR:", err); // 👈 helps debug
    res.status(500).json({ error: err.message });
  }
};

// DELETE TRANSACTION
exports.deleteTransaction = async (req, res) => {
  try {
    console.log("USER:", req.user); // ✅ debug

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Not found" });
    }

    // 🔐 ownership check
    if (transaction.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await transaction.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET USER TRANSACTIONS
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET SUMMARY
exports.getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    });

    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") {
        income += t.amount;
      } else {
        expense += t.amount;
      }
    });

    res.json({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
    });
  } catch (err) {
    console.log("SUMMARY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};