"use client";
import portfolioConfig from "@/data/portfolio.config";

const { personal } = portfolioConfig;

export default function Footer() {
  return (
    <footer
      style={{
        padding: "2.5rem 0",
        background: "rgba(4,4,10,0.62)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderTop: "1px solid rgba(245,158,11,0.15)",
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
