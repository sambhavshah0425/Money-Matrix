import React, { useEffect, useState } from "react";

function Preferences() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);

    // apply theme to body
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div style={{ padding: "20px", background: "#020617", borderRadius: "16px" }}>
      <h3 style={{ marginBottom: "15px" }}>⚙️ Preferences</h3>

      <div>
        <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          🌙 Dark Mode
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </label>
      </div>
    </div>
  );
}

export default Preferences;