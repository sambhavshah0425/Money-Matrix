import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function MonthlyChart({ transactions }) {
  const monthlyData = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const month = date.toLocaleString("default", { month: "short" });

    if (!monthlyData[month]) {
      monthlyData[month] = { month, income: 0, expense: 0 };
    }

    if (t.type === "income") {
      monthlyData[month].income += t.amount;
    } else {
      monthlyData[month].expense += t.amount;
    }
  });

  const chartData = Object.values(monthlyData);

  return (
    <div className="card" style={{ marginTop: "20px" }}>
      <h3 style={{ marginBottom: "10px" }}>Income vs Expenses</h3>
      <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "20px" }}>
        Monthly comparison — 2026
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} barGap={8}>
          
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

          {/* X Axis */}
          <XAxis 
            dataKey="month" 
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
          />

          {/* Y Axis */}
          <YAxis 
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              border: "1px solid #38bdf8",
              borderRadius: "10px",
              color: "white",
            }}
            cursor={{ fill: "rgba(56,189,248,0.1)" }}
          />

          {/* 💚 Income */}
          <Bar
            dataKey="income"
            radius={[6, 6, 0, 0]}
            fill="url(#incomeGradient)"
          />

          {/* ❤️ Expense */}
          <Bar
            dataKey="expense"
            radius={[6, 6, 0, 0]}
            fill="url(#expenseGradient)"
          />

          {/* 🔥 Gradients */}
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={1}/>
              <stop offset="100%" stopColor="#16a34a" stopOpacity={0.7}/>
            </linearGradient>

            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={1}/>
              <stop offset="100%" stopColor="#dc2626" stopOpacity={0.7}/>
            </linearGradient>
          </defs>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyChart;