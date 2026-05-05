import api from "../api/axios";
import { useState } from "react";
const API = import.meta.env.VITE_API_URL;
export default function NixonAuth() {
  const [mode, setMode] = useState("signup");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "India",
  });

  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) =>
    setForm({ ...form, [key]: e.target.value });

  // ✅ MAIN SUBMIT FUNCTION (FIXED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url =
        mode === "signup"
          ? `${API}/auth/register`
          : `${API}/auth/login`;

      const payload =
        mode === "signup"
          ? {
              name: (form.firstName + " " + form.lastName).trim(),
              email: form.email.trim(),
              password: form.password.trim(),
            }
          : {
              email: form.email.trim(),
              password: form.password.trim(),
            };

      console.log("SENDING:", payload);

      const res = await api.post(url, payload);

      // ✅ LOGIN SUCCESS
      if (mode === "login") {
       sessionStorage.setItem("token", res.data.token);
        console.log("TOKEN SAVED:", res.data.token);

        setSubmitted(true);

        setTimeout(() => {
          window.location.reload(); // go dashboard
        }, 1000);
      }

      // ✅ SIGNUP SUCCESS
      if (mode === "signup") {
        setSubmitted(true);

        setTimeout(() => {
          setMode("login"); // switch to login
          setSubmitted(false);
        }, 1200);
      }
    } catch (err) {
      console.log("ERROR FULL:", err);
      console.log("ERROR DATA:", err.response?.data);

      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          background: "#0b1220",
          padding: "25px",
          borderRadius: "16px",
          width: "350px",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          {mode === "signup" ? "Sign Up" : "Login"}
        </h2>

        {submitted && (
          <p style={{ textAlign: "center", color: "lightgreen" }}>
            {mode === "signup"
              ? "Account created!"
              : "Login successful!"}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <input
                placeholder="First Name"
                value={form.firstName}
                onChange={set("firstName")}
                required
                style={inputStyle}
              />

              <input
                placeholder="Last Name"
                value={form.lastName}
                onChange={set("lastName")}
                required
                style={inputStyle}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={set("email")}
            required
            style={inputStyle}
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={set("password")}
              required
              style={{ ...inputStyle, paddingRight: "40px" }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={eyeBtn}
            >
              👁
            </button>
          </div>

         

          <button type="submit" style={btnStyle}>
            {mode === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          {mode === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            style={{ color: "#4ea1ff", cursor: "pointer" }}
            onClick={() =>
              setMode(mode === "signup" ? "login" : "signup")
            }
          >
            {mode === "signup" ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

// 🎨 styles
const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "8px",
  border: "1px solid #1e3a8a",
  background: "#020617",
  color: "white",
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
  fontWeight: "bold",
  cursor: "pointer",
};

const eyeBtn = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "white",
};