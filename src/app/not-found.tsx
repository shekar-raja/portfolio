"use client";

import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    window.location.replace("/portfolio");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        fontFamily: "sans-serif",
        gap: "1.5rem",
      }}
    >
      <p style={{ color: "#888", fontSize: "1rem" }}>Redirecting…</p>
      <a
        href="/portfolio"
        style={{
          color: "#fff",
          fontWeight: 600,
          fontSize: "1.1rem",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        }}
      >
        Go to Portfolio →
      </a>
    </div>
  );
}
