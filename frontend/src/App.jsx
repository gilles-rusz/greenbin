import { useEffect, useState } from "react";

function App() {
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then(res => res.json())
      .then(data => setApiMessage(data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>GreenBin Frontend Ready </h1>
      <p>Backend says: {apiMessage || "waiting..."}</p>
    </div>
  );
}

export default App;
