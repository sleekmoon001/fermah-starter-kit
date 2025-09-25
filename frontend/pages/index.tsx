import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/fermah-logo.png"; // place logo in public folder

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
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "sans-serif",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background animation */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          animation: "moveBG 10s linear infinite",
          zIndex: 0,
        }}
      />

      {/* Fermah Logo */}
      <div style={{ zIndex: 1, marginBottom: "2rem" }}>
        <Image src={logo} alt="Fermah Logo" width={200} height={200} />
      </div>

      <h1 style={{ zIndex: 1 }}>Fermah Starter Kit 🚀</h1>
      <p style={{ zIndex: 1 }}>Click below to generate a proof:</p>

      <button
        onClick={handleGenerateProof}
        disabled={loading}
        style={{
          zIndex: 1,
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
            zIndex: 1,
            marginTop: "2rem",
            padding: "1rem",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "5px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {result}
        </pre>
      )}

      {/* Keyframes animation */}
      <style jsx>{`
        @keyframes moveBG {
          0% { background-position: 0 0; }
          100% { background-position: 100px 100px; }
        }
      `}</style>
    </div>
  );
}
