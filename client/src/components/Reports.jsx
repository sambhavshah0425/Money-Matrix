import React from "react";

function Reports({ transactions }) {

  const downloadCSV = () => {
    if (!transactions.length) {
      alert("No data to export");
      return;
    }

    const headers = ["Amount", "Type", "Category", "Date", "Description"];

    const rows = transactions.map((t) => [
      t.amount,
      t.type,
      t.category,
      new Date(t.date).toLocaleDateString(),
      t.description || "",
    ]);

    const csvContent =
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "20px", background: "#020617", borderRadius: "16px" }}>
      <h3>📄 Export Report</h3>

      <button onClick={downloadCSV} style={{
        marginTop: "10px",
        padding: "10px 15px",
        borderRadius: "10px",
        background: "#38bdf8",
        color: "black",
        border: "none",
        cursor: "pointer"
      }}>
        Download CSV
      </button>
    </div>
  );
}

export default Reports;