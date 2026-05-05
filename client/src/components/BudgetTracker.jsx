import React from "react";

function BudgetTracker({ transactions }) {
  const budgetLimits = {
    Food: 10000,
    Transport: 5000,
    Shopping: 8000,
    others: 3500,
  };

  const icons = {
    Food: "🍔",
    Transport: "🚌",
    Shopping: "🛍️",
    others: "⚡",
  };

  const totals = {};

  // Calculate spending
  transactions.forEach((t) => {
    if (t.type === "expense") {
      totals[t.category] =
        (totals[t.category] || 0) + Number(t.amount);
    }
  });

  const totalBudget = Object.values(budgetLimits).reduce((a, b) => a + b, 0);
  const totalSpent = Object.values(totals).reduce((a, b) => a + b, 0);
  const totalRemaining = totalBudget - totalSpent;

  return (
    <div style={{ padding: "20px", background: "#020617", borderRadius: "16px" }}>
      
      {/* HEADER */}
      <h3 style={{ marginBottom: "5px" }}>Budget Tracker</h3>
      <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "15px" }}>
        {new Date().toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* TOTAL SUMMARY */}
      <div style={{ marginBottom: "20px", fontSize: "14px" }}>
        <p>💰 Total: ₹{totalBudget.toLocaleString()}</p>
        <p>💸 Used: ₹{totalSpent.toLocaleString()}</p>
        <p style={{ color: totalRemaining < 0 ? "red" : "#22c55e" }}>
          🏦 Remaining: ₹{totalRemaining.toLocaleString()}
        </p>
      </div>

      {/* CATEGORY LOOP */}
      {Object.keys(budgetLimits).map((cat) => {
        const spent = totals[cat] || 0;
        const limit = budgetLimits[cat];
        const percent = Math.min((spent / limit) * 100, 100);
        const remaining = limit - spent;

        let status = "✅ Safe";
        if (spent > limit) status = "🚨 Exceeded";
        else if (percent > 70) status = "⚠️ Near limit";

        return (
          <div key={cat} style={{ marginBottom: "20px" }}>
            
            {/* TOP ROW */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                {icons[cat]} {cat}
              </div>
              <div>
                ₹{spent.toLocaleString()} / ₹{limit.toLocaleString()}
              </div>
            </div>

            {/* INFO */}
            <div
              style={{
                fontSize: "12px",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "5px",
              }}
            >
              <span>{percent.toFixed(0)}% used</span>
              <span style={{ color: remaining < 0 ? "red" : "#22c55e" }}>
                ₹{Math.abs(remaining).toLocaleString()}{" "}
                {remaining < 0 ? "over" : "left"}
              </span>
            </div>

            {/* STATUS */}
            <div
              style={{
                fontSize: "12px",
                marginBottom: "5px",
                color:
                  spent > limit ? "red" : percent > 70 ? "orange" : "#22c55e",
              }}
            >
              {status}
            </div>

            {/* PROGRESS BAR */}
            <div
              style={{
                height: "8px",
                background: "#111827",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  height: "100%",
                  borderRadius: "10px",
                  background:
                    spent > limit
                      ? "#ef4444"
                      : percent > 70
                      ? "#f59e0b"
                      : "#22c55e",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BudgetTracker;