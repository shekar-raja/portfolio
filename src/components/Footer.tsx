"use client";
import portfolioConfig from "@/data/portfolio.config";

const { personal } = portfolioConfig;

export default function Footer() {
  return (
    <footer
      style={{
        padding: "2.5rem 0",
        background: "rgba(5,5,8,0.92)",
        borderTop: "1px solid rgba(99,102,241,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: "var(--text-secondary)",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "var(--indigo-light)" }}>rs</span>
          <span style={{ opacity: 0.5 }}>.</span>
        </span>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.78rem",
            opacity: 0.5,
          }}
        >
          Built with Next.js · Deployed on GitHub Pages
        </p>

        <div style={{ display: "flex", gap: "1.25rem" }}>
          {[
            { label: "GitHub", href: personal.github },
            { label: "LinkedIn", href: personal.linkedin },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: "0.78rem",
                opacity: 0.6,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.6")
              }
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
