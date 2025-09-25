import React, { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<string>("");

  async function handleGenerateProof() {
    try {
      const res = await fetch("https://fermah-prover.onrender.com/prove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: { a: 1, b: 2 } }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
      setResult("❌ Error calling prover-server");
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Fermah Starter Kit 🚀</h1>
      <p>Click below to generate a proof:</p>
      <button
        onClick={handleGenerateProof}
        style={{
          padding: "0.5rem 1rem",
          marginTop: "1rem",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Generate Proof
      </button>

      {result && (
        <pre
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "#f4f4f4",
            borderRadius: "5px",
          }}
        >
          {result}
        </pre>
      )}
    </div>
  );
}
