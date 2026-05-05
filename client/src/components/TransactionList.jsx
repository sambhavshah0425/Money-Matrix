function TransactionList({ transactions, handleDelete }) {
  return (
    <div className="txn-card">
      <div className="txn-header">
        <div>
          <h3>Recent Transactions</h3>
          <p>Latest activity</p>
        </div>
        <button className="view-btn">View all →</button>
      </div>

      <div className="txn-list">
       {transactions
  .slice(0, 5) // 🔥 only latest 5
  .map((t) => (
          <div key={t._id} className="txn-item">

            {/* LEFT ICON */}
            <div className="txn-icon">💳</div>

            {/* CENTER TEXT */}
            <div className="txn-info">
              <p className="txn-title">{t.category}</p>
              <small className="txn-desc">
                {t.description ? t.description : t.type}
              </small>
            </div>

            {/* DATE ✅ FIXED */}
            <p className="txn-date">
              {t.date
                ? new Date(t.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "—"}
            </p>

            {/* AMOUNT */}
            <div
              className={`txn-amount ${
                t.type === "income" ? "green" : "red"
              }`}
            >
              {t.type === "income" ? "+" : "-"}₹{t.amount}
            </div>

            {/* DELETE */}
            <button
              className="delete-btn"
              onClick={() => handleDelete(t._id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionList;