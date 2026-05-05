import { useState } from "react";

function AddTransactionForm({ form, setForm, handleAdd }) {
  return (
    <div className="add-card">
      <h2>Add Transaction</h2>
      <p className="sub">Record a new entry</p>

      {/* TYPE TOGGLE */}
      <div className="type-toggle">
        <button
          type="button"
          className={form.type === "expense" ? "active expense" : ""}
          onClick={() => setForm({ ...form, type: "expense" })}
        >
          📥 Expense
        </button>

        <button
          type="button"
          className={form.type === "income" ? "active income" : ""}
          onClick={() => setForm({ ...form, type: "income" })}
        >
          📤 Income
        </button>
      </div>

      {/* FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault();

          // ✅ VALIDATION
          if (!form.amount || form.amount <= 0) {
            alert("Enter valid amount");
            return;
          }

          if (!form.category) {
            alert("Please select a category");
            return;
          }

          console.log("FORM SUBMITTED:", form);

          handleAdd(e);
        }}
      >
        <div className="form-grid">
          {/* AMOUNT */}
          <div>
            <label>AMOUNT (₹)</label>
            <input
              type="number"
              placeholder="0.00"
              value={form.amount || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: Number(e.target.value),
                })
              }
            />
          </div>

          {/* DATE */}
          <div>
            <label>DATE</label>
            <input
              type="date"
              value={form.date || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value,
                })
              }
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label>CATEGORY</label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
            >
              <option value="">Select...</option>
              <option>Food</option>
              <option>Transport</option>
              <option>Shopping</option>
              <option>others</option>
            </select>
          </div>

          {/* PAYMENT MODE */}
          <div>
            <label>PAYMENT MODE</label>
            <select
              value={form.paymentMode || "Cash"}
              onChange={(e) =>
                setForm({
                  ...form,
                  paymentMode: e.target.value,
                })
              }
            >
              <option>UPI</option>
              <option>Cash</option>
              <option>Card</option>
            </select>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label>DESCRIPTION</label>
          <input
            placeholder="e.g. Lunch at office"
            value={form.description || ""}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button type="submit" className="add-btn">
          + Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;