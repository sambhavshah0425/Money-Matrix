import React from "react";

function Sidebar({
  onTransactionClick,
  onAnalyticsClick,
  onReportsClick,
  onListClick,
  onInfoClick,
  onInvestmentsClick, // 🔥 NEW
}) {

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="sidebar">

      <div>
        <div className="logo">💰 Money Matrix</div>

        <p className="section">OVERVIEW</p>

        <div className="nav-item active">🔷 Dashboard</div>

        <div
          className="nav-item"
          onClick={onTransactionClick}
          style={{ cursor: "pointer" }}
        >
          🔄 Transactions
        </div>

        <div
          className="nav-item"
          onClick={onAnalyticsClick}
          style={{ cursor: "pointer" }}
        >
          📊 Analytics
        </div>

        <div
          className="nav-item"
          onClick={onListClick}
          style={{ cursor: "pointer" }}
        >
          📋 List
        </div>

        <div
          className="nav-item"
          onClick={onInfoClick}
          style={{ cursor: "pointer" }}
        >
          ℹ️ Information
        </div>

        {/* 🔥 INVESTMENTS CLICK */}
        <div
          className="nav-item"
          onClick={onInvestmentsClick}
          style={{ cursor: "pointer" }}
        >
          📈 Investments
        </div>

        <div
          className="nav-item"
          onClick={onReportsClick}
          style={{ cursor: "pointer" }}
        >
          📄 Reports
        </div>

      </div>

      <div className="sidebar-user">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;