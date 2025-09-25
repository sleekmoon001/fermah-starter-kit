import React from "react";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<string>("");

  async function handleGenerateProof() {
    try {
      const res = await fetch("https://fermah-prover.onrender.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: { a: 1, b: 2 } }),
      });
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
      setResult("❌ Error calling prover-server");
    }
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🚀 Fermah Starter Kit is Live</h1>
      <button
        onClick={handleGenerateProof}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Generate Proof
      </button>

      {result && (
        <pre style={{ marginTop: "1rem", background: "#f4f4f4", padding: "1rem" }}>
          {result}
        </pre>
      )}
    </main>
  );
}
