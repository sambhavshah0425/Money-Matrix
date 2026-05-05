import React, { useState } from "react";

function TablePreview({ transactions }) {

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // 🔍 FILTER
  const filtered = transactions.filter((t) =>
    (t.description || "").toLowerCase().includes(search.toLowerCase()) ||
    (t.category || "").toLowerCase().includes(search.toLowerCase())
  );

  // 📄 PAGINATION LOGIC
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div style={{
      marginTop: "20px",
      padding: "20px",
      background: "#020617",
      borderRadius: "16px",
    }}>
      <h3 style={{ marginBottom: "10px" }}>📊 Transactions Preview</h3>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="🔍 Search category or description..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // reset page on search
        }}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "10px",
          border: "1px solid #1e293b",
          background: "#020617",
          color: "white",
        }}
      />

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          
          <thead>
            <tr style={{ background: "#0f172a" }}>
              {["Amount", "Type", "Category", "Date", "Description"].map((h) => (
                <th key={h} style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "1px solid #1e293b",
                  color: "#94a3b8",
                  fontSize: "13px",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="5" style={{
                  padding: "15px",
                  textAlign: "center",
                  color: "#94a3b8"
                }}>
                  😕 No matching transactions
                </td>
              </tr>
            ) : (
              paginatedData.map((t, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #1e293b" }}>
                  <td style={{ padding: "10px" }}>₹{t.amount}</td>

                  <td style={{ padding: "10px", color: t.type === "income" ? "#22c55e" : "#ef4444" }}>
                    {t.type}
                  </td>

                  <td style={{ padding: "10px" }}>{t.category}</td>

                  <td style={{ padding: "10px" }}>
                    {new Date(t.date).toISOString().split("T")[0]}
                  </td>

                  <td style={{ padding: "10px" }}>
                    {t.description || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* 🔥 PAGINATION UI */}
      {totalPages > 1 && (
        <div style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap"
        }}>
          {/* PREV */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            style={btnStyle}
          >
            Prev
          </button>

          {/* PAGE NUMBERS */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                ...btnStyle,
                background: currentPage === i + 1 ? "#1e3a8a" : "#020617",
              }}
            >
              {i + 1}
            </button>
          ))}

          {/* NEXT */}
          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            style={btnStyle}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

// 🔥 BUTTON STYLE
const btnStyle = {
  padding: "6px 12px",
  borderRadius: "8px",
  border: "1px solid #1e293b",
  background: "#020617",
  color: "white",
  cursor: "pointer",
};

export default TablePreview;