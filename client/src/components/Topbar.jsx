function Topbar({ onAddClick }) {
  return (
    <div className="topbar">
      {/* LEFT */}
      <div>
        <h1>Welcome!</h1>
        <p>Let's track your expenses!</p>
      </div>

      {/* RIGHT */}
      <div className="top-actions">
        <button className="add-btn" onClick={onAddClick}>
          + Add Transaction
        </button>
      </div>
    </div>
  );
}

export default Topbar;