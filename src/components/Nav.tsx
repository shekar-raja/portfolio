"use client";
import { useEffect, useRef, useState } from "react";
import portfolioConfig from "@/data/portfolio.config";

const links = portfolioConfig.nav;
const { personal } = portfolioConfig;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "background 0.3s, border-color 0.3s",
        background: scrolled ? "rgba(5, 5, 8, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(99,102,241,0.15)"
          : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#f1f5f9",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "var(--indigo-light)" }}>rs</span>
          <span style={{ color: "var(--text-secondary)" }}>.</span>
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLAnchorElement).style.color =
                    "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.color =
                    "var(--text-secondary)")
                }
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "6px",
                border: "1px solid var(--indigo)",
                color: "var(--indigo-light)",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(99,102,241,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
              }}
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "var(--text-primary)",
                borderRadius: "2px",
                transition: "transform 0.3s, opacity 0.3s",
                transform:
                  menuOpen && i === 0
                    ? "rotate(45deg) translate(5px,5px)"
                    : menuOpen && i === 1
                      ? "scaleX(0)"
                      : menuOpen && i === 2
                        ? "rotate(-45deg) translate(5px,-5px)"
                        : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(5,5,8,0.97)",
            borderTop: "1px solid rgba(99,102,241,0.15)",
            padding: "1rem 2rem 1.5rem",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "0.65rem 0",
                color: "var(--text-secondary)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(99,102,241,0.08)",
                fontSize: "1rem",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              padding: "0.6rem 1.5rem",
              borderRadius: "6px",
              border: "1px solid var(--indigo)",
              color: "var(--indigo-light)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Resume
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
