const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["income", "expense"], // 🔥 restrict values
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    date: {
      type: Date,
      default: Date.now, // ✅ your main date field
    },
  },
  {
    timestamps: true, // 🔥 adds createdAt + updatedAt (bonus)
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);