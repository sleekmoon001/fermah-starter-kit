import React, { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleGenerateProof() {
    setLoading(true);
    setResult("");

    try {
      const proverUrl = process.env.NEXT_PUBLIC_PROVER_URL;
      if (!proverUrl) throw new Error("Backend URL not set");

      const res = await fetch(proverUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: { a: 1, b: 2 } }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
      setResult("❌ Error calling prover-server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Fermah Starter Kit 🚀</h1>
      <p>Click below to generate a proof:</p>
      <button
        onClick={handleGenerateProof}
        disabled={loading}
        style={{
          padding: "0.5rem 1rem",
          marginTop: "1rem",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Proof"}
      </button>

      {result && (
        <pre
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "#f4f4f4",
            borderRadius: "5px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {result}
        </pre>
      )}
    </div>
  );
}
