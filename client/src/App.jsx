import { useState, useEffect } from "react";
import NixonAuth from "./pages/NixonAuth";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return token ? <Dashboard /> : <NixonAuth />;
}

export default App;