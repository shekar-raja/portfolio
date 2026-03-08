"use client";
import { useEffect } from "react";
import portfolioConfig from "@/data/portfolio.config";

const { personal } = portfolioConfig;

export default function ResumePage() {
  useEffect(() => {
    const localPdf = "/portfolio/resume.pdf";

    fetch(localPdf, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          window.location.replace(localPdf);
        } else {
          window.location.replace(personal.resumeSource);
        }
      })
      .catch(() => {
        window.location.replace(personal.resumeSource);
      });
  }, []);

  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#888",
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
        cursor: "auto",
      }}
    >
      Loading CV…
    </main>
  );
}
