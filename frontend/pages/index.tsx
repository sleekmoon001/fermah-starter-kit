import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../public/fermah-logo.png"; // make sure fermah-logo.png is in /frontend/public/

export default function Home() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll("section").forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Proof generator
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

      const text = await res.text();
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = text;
      }
      setResult(typeof parsed === "string" ? parsed : JSON.stringify(parsed, null, 2));
    } catch (err) {
      setResult("❌ Error: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Animated shiny background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -2,
          background:
            "linear-gradient(135deg, #0f0c29, #302b63, #24243e, #1f4037, #99f2c8)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 20s ease infinite",
        }}
      />

      {/* Floating dots */}
      <div className="dots-bg">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="dot" />
        ))}
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className={`fade-section ${visibleSections["hero"] ? "visible" : ""}`}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <Image src={logo} alt="Fermah Logo" width={180} height={180} />
        <h1 style={{ fontSize: "3rem", marginTop: "1rem", fontWeight: "bold" }}>
          Welcome to Fermah 🚀
        </h1>
        <p style={{ maxWidth: "600px", marginTop: "1rem", fontSize: "1.2rem" }}>
          A journey into Zero-Knowledge proofs, simplified with the Fermah Starter Kit.
        </p>
        <a href="#about">
          <button className="btn">Learn More ↓</button>
        </a>
      </section>

      {/* About Fermah */}
      <section
        id="about"
        className={`fade-section ${visibleSections["about"] ? "visible" : ""}`}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>What is Fermah?</h2>
        <p style={{ maxWidth: "800px", marginTop: "1.5rem", fontSize: "1.2rem", lineHeight: "1.6" }}>
          Fermah is an innovative framework for experimenting with cryptography and
          Zero-Knowledge proofs. It allows developers, researchers, and enthusiasts
          to test powerful proof systems in an easy-to-use environment.
        </p>
        <a href="#starter-kit">
          <button className="btn">Discover the Starter Kit ↓</button>
        </a>
      </section>

      {/* Starter Kit */}
      <section
        id="starter-kit"
        className={`fade-section ${visibleSections["starter-kit"] ? "visible" : ""}`}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>The Fermah Starter Kit</h2>
        <p style={{ maxWidth: "800px", marginTop: "1.5rem", fontSize: "1.2rem", lineHeight: "1.6" }}>
          The Fermah Starter Kit is your gateway into the world of ZK proofs. It is an
          illustrative, beginner-friendly environment built to help you explore,
          understand, and experiment with cryptographic proofs step by step. With just
          a click, you can generate your first proof and see cryptography in action!
        </p>
        <a href="#generate">
          <button className="btn">Try It Yourself ↓</button>
        </a>
      </section>

      {/* Proof Generator */}
      <section
        id="generate"
        className={`fade-section ${visibleSections["generate"] ? "visible" : ""}`}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Generate Your First Proof</h2>
        <p style={{ maxWidth: "600px", marginTop: "1rem", fontSize: "1.2rem" }}>
          Click the button below to generate your first Zero-Knowledge proof with the Fermah Starter Kit.
        </p>
        <button
          onClick={handleGenerateProof}
          disabled={loading}
          className="btn"
          style={{ marginTop: "2rem" }}
        >
          {loading ? "Generating..." : "Generate Proof"}
        </button>

        {result && (
          <pre
            style={{
              marginTop: "2rem",
              padding: "1rem",
              background: "rgba(0,0,0,0.6)",
              borderRadius: "8px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              maxWidth: "800px",
              textAlign: "left",
            }}
          >
            {result}
          </pre>
        )}
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "2rem",
          textAlign: "center",
          fontSize: "1rem",
          color: "#ddd",
        }}
      >
        Built by <span style={{ fontWeight: "bold" }}>sleekmoon0001</span> @discord and{" "}
        <a
          href="https://x.com/sleekmoon001?s=21"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1DA1F2", textDecoration: "none", fontWeight: "bold" }}
        >
          sleekmoon001 @X
        </a>{" "}
        for the love of Fermah ❤️
      </footer>

      {/* Styles */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(45deg, #ff512f, #dd2476);
          border: none;
          border-radius: 8px;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn:hover {
          transform: scale(1.05);
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
        }
        .fade-section {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1s ease, transform 1s ease;
        }
        .fade-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .dots-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1;
        }
        .dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: float 20s infinite linear;
        }
        .dot:nth-child(odd) {
          background: rgba(255, 255, 255, 0.6);
        }
        @keyframes float {
          from {
            transform: translateY(100vh) scale(0.5);
          }
          to {
            transform: translateY(-10vh) scale(1);
          }
        }
        .dot {
          top: 100vh;
          left: calc(100% * var(--i));
          animation-delay: calc(-1s * var(--i));
        }
      `}</style>
    </div>
  );
}
