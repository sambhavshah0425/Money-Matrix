import api from "../api/axios";
import { useEffect, useState, useRef } from "react";

import Reports from "../components/Reports";
import BudgetTracker from "../components/BudgetTracker";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Stats from "../components/Stats";
import TransactionList from "../components/TransactionList";
import AddTransactionForm from "../components/AddTransactionForm";
import MonthlyChart from "../components/MonthlyChart";
import CategoryChart from "../components/CategoryChart";
import TablePreview from "../components/TablePreview";

function Dashboard() {

  // 🔥 REFS
  const transactionRef = useRef(null);
  const formRef = useRef(null);
  const budgetRef = useRef(null);
  const reportRef = useRef(null);
  const previewRef = useRef(null);
  const insightRef = useRef(null);
  const chartRef = useRef(null); // 🔥 NEW

  const [activeSection, setActiveSection] = useState("");

  const glowStyle = {
    boxShadow: `
      0 0 12px rgba(30, 58, 138, 0.8),
      0 0 30px rgba(30, 58, 138, 0.9),
      0 0 60px rgba(30, 58, 138, 0.7),
      inset 0 0 10px rgba(30, 58, 138, 0.5)
    `,
    transform: "scale(1.01)",
    transition: "all 0.3s ease",
  };

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    if (saved) document.body.classList.add("dark");
  }, []);

  // 🔥 SCROLL FUNCTIONS
  const scrollToTransactions = () => {
    transactionRef.current?.scrollIntoView({ behavior: "smooth" });
    setActiveSection("transactions");
    setTimeout(() => setActiveSection(""), 2000);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBudget = () => {
    budgetRef.current?.scrollIntoView({ behavior: "smooth" });
    setActiveSection("budget");
    setTimeout(() => setActiveSection(""), 2000);
  };

  const scrollToReports = () => {
    reportRef.current?.scrollIntoView({ behavior: "smooth" });
    setActiveSection("reports");
    setTimeout(() => setActiveSection(""), 2000);
  };

  const scrollToPreview = () => {
    previewRef.current?.scrollIntoView({ behavior: "smooth" });
    setActiveSection("preview");
    setTimeout(() => setActiveSection(""), 2000);
  };

  const scrollToInsights = () => {
    insightRef.current?.scrollIntoView({ behavior: "smooth" });
    setActiveSection("insights");
    setTimeout(() => setActiveSection(""), 2000);
  };

  // 🔥 NEW: INVESTMENTS → CHART
  const scrollToChart = () => {
    chartRef.current?.scrollIntoView({ behavior: "smooth" });
    setActiveSection("chart");
    setTimeout(() => setActiveSection(""), 2000);
  };

  // 🔥 STATE
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    category: "Food",
    description: "",
    date: "",
    paymentMode: "Cash",
  });

  const [transactions, setTransactions] = useState([]);
  const token = sessionStorage.getItem("token");

  // 🔥 FETCH
  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const summaryRes = await api.get("/transactions/summary", { headers });
      const listRes = await api.get("/transactions", { headers });

      setData(summaryRes.data);
      setTransactions(listRes.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // 🔥 ADD
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!form.amount || form.amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    try {
      await api.post("/transactions", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchData();

      setForm({
        amount: "",
        type: "expense",
        category: "Food",
        description: "",
        date: "",
        paymentMode: "Cash",
      });
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      fetchData();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="app">

      <Sidebar
        onTransactionClick={scrollToTransactions}
        onAnalyticsClick={scrollToBudget}
        onReportsClick={scrollToReports}
        onListClick={scrollToPreview}
        onInfoClick={scrollToInsights}
        onInvestmentsClick={scrollToChart} // 🔥 NEW
      />

      <div className="main">

        <Topbar onAddClick={scrollToForm} />
        <Stats data={data} />

        <div className="mid-row">

          {/* LEFT */}
          <div className="chart-card">

            {/* 🔥 CHART TARGET */}
            <div
              ref={chartRef}
              style={{
                ...(activeSection === "chart" ? glowStyle : {}),
                borderRadius: "12px"
              }}
            >
            
              <MonthlyChart transactions={transactions} />
            </div>

            {/* TABLE PREVIEW */}
            <div
              ref={previewRef}
              style={{
                ...(activeSection === "preview" ? glowStyle : {}),
                borderRadius: "12px",
                marginTop: "20px"
              }}
            >
              <TablePreview transactions={transactions} />
            </div>

          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            <div
              ref={budgetRef}
              style={{
                ...(activeSection === "budget" ? glowStyle : {}),
                borderRadius: "12px"
              }}
            >
              <BudgetTracker transactions={transactions} />
            </div>

            <div
              ref={insightRef}
              style={{
                ...(activeSection === "insights" ? glowStyle : {}),
                borderRadius: "12px"
              }}
            >
              <CategoryChart transactions={transactions} data={data} />
            </div>

            <div
              ref={reportRef}
              style={{
                ...(activeSection === "reports" ? glowStyle : {}),
                borderRadius: "12px"
              }}
            >
              <Reports transactions={transactions} />
            </div>

          </div>

        </div>

        <div className="bottom-row">

          <div
            ref={transactionRef}
            style={{
              ...(activeSection === "transactions" ? glowStyle : {}),
              borderRadius: "12px"
            }}
          >
            <TransactionList
              transactions={[...transactions].sort(
                (a, b) => new Date(b.date) - new Date(a.date)
              )}
              handleDelete={handleDelete}
            />
          </div>

          <div ref={formRef}>
            <AddTransactionForm
              form={form}
              setForm={setForm}
              handleAdd={handleAdd}
            />
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;