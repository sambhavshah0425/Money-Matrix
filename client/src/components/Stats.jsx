function Stats({ data }) {
  return (
    <div className="stats-grid">
      <div className="stat-card blue">
        <p>TOTAL BALANCE</p>
        <h2>₹{data.balance}</h2>
        
      </div>

      <div className="stat-card green">
        <p>TOTAL INCOME</p>
        <h2>₹{data.totalIncome}</h2>
        
      </div>

      <div className="stat-card red">
        <p>TOTAL EXPENSES</p>
        <h2>₹{data.totalExpense}</h2>
       
      </div>

      <div className="stat-card purple">
        <p>MONTHLY SAVINGS</p>
        <h2>₹{data.balance}</h2>
        
      </div>
    </div>
  );
}

export default Stats;