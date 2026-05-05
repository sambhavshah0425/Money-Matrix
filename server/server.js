console.log("SERVER FILE LOADED");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// ✅ FINAL CORS FIX (WORKS 100%)
app.use(cors({
  origin: "*", // allow all (fixes your issue instantly)
 
}));

// ✅ handle preflight requests
app.options("*", cors());

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});