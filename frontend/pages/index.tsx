import React, { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<string>("");

  async function handleGenerateProof() {
    try {
      const res = await fetch("https://fermah-prover.onrender.com/prove", { // <- FIXED URL
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
    <main style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>🚀 Fermah Starter Kit</h1>
      <button
        onClick={handleGenerateProof}
        style={{ marginTop: "1.5rem", padding: "0.75rem 1.5rem", cursor: "pointer" }}
      >
        Generate Proof
      </button>
      {result && (
        <pre
          style={{
            marginTop: "1.5rem",
            background: "#f4f4f4",
            padding: "1rem",
            width: "90%",
            maxWidth: "600px",
            overflowX: "auto",
          }}
        >
          {result}
        </pre>
      )}
    </main>
  );
}
