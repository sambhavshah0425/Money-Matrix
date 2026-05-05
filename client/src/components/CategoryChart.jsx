import React from "react";

function CategoryChart({ transactions, data }) {
  const insights = [];

  const totalIncome = data?.totalIncome || 0;
  const totalExpense = data?.totalExpense || 0;
  const balance = data?.balance || 0;

  // 🔥 1. Income vs Expense
  if (totalExpense > totalIncome) {
    insights.push("⚠️ You are spending more than you earn");
  } else {
    insights.push("✅ You are managing your expenses well");
  }

  // 🔥 2. Find biggest category
  const categoryTotals = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + Number(t.amount);
    }
  });

  let maxCategory = "";
  let maxValue = 0;

  for (let cat in categoryTotals) {
    if (categoryTotals[cat] > maxValue) {
      maxValue = categoryTotals[cat];
      maxCategory = cat;
    }
  }

  if (maxCategory) {
    insights.push(`💡 ${maxCategory} is your highest expense`);
  }

  // 🔥 3. Balance check
  if (balance < 0) {
    insights.push("🚨 Your balance is negative");
  } else {
    insights.push(`💰 You still have ₹${balance.toLocaleString()} remaining`);
  }

  // 🔥 4. Low spending category
  const categories = Object.keys(categoryTotals);
  if (categories.length > 0) {
    const minCat = categories.reduce((a, b) =>
      categoryTotals[a] < categoryTotals[b] ? a : b
    );
    insights.push(`📉 ${minCat} spending is low`);
  }

  return (
    <div
      style={{
        padding: "20px",
        background: "#020617",
        borderRadius: "16px",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>Smart Insights</h3>

      <div style={{ fontSize: "14px", color: "#e2e8f0" }}>
        {insights.map((item, index) => (
          <p key={index} style={{ marginBottom: "8px" }}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export default CategoryChart;