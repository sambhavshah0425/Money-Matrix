import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function Chart({ data }) {
  const chartData = [
    { name: "Income", value: data.totalIncome },
    { name: "Expense", value: data.totalExpense },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="card" style={{ marginTop: "20px", textAlign: "center" }}>
  <h3 style={{ marginBottom: "10px" }}>Overview</h3>

  <PieChart width={350} height={280}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          isAnimationActive={true}
animationDuration={800}
        >
          {chartData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

       <Tooltip
  contentStyle={{
    backgroundColor: "#020617",
    border: "1px solid #38bdf8",
    borderRadius: "10px",
    color: "white",
  }}
/>
       <Legend
  wrapperStyle={{
    color: "white",
    marginTop: "10px",
  }}
/>
      </PieChart>
    </div>
  );
}

export default Chart;