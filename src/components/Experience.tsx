"use client";
import { useEffect, useRef } from "react";
import portfolioConfig from "@/data/portfolio.config";
import CharReveal from "@/components/CharReveal";

const { experience } = portfolioConfig;

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Progressive reveal with IntersectionObserver (no SSR issues)
    const items = sectionRef.current?.querySelectorAll(".exp-item");
    const line = lineRef.current;
    if (!items || !line) return;

    // Animate line fill on scroll
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      // Start filling when the section heading enters view (rect.top < 50vh),
      // reach 100% before the section scrolls off — same speed as original.
      const visibleFraction = Math.min(
        Math.max((-rect.top + viewH * 0.5) / (rect.height * 0.55), 0),
        1,
      );
      line.style.height = `${visibleFraction * 100}%`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("exp-visible");
          }
        });
      },
      { threshold: 0.25 },
    );
    items.forEach((item) => observer.observe(item));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        padding: "8rem 0",
        background: "rgba(4,4,10,0.62)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderTop: "1px solid rgba(245,158,11,0.15)",
      }}
    >
      <style>{`
        .exp-item {
          opacity: 0;
          transform: translateX(-32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .exp-item.exp-visible {
          opacity: 1;
          transform: none;
        }
        .exp-item:nth-child(1) { transition-delay: 0.05s; }
        .exp-item:nth-child(2) { transition-delay: 0.15s; }
        .exp-item:nth-child(3) { transition-delay: 0.25s; }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <p
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 600,
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--cyan)",
            marginBottom: "0.75rem",
          }}
        >
          Experience
        </p>
        <CharReveal
          text="Where I've worked"
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginBottom: "4rem",
            display: "block",
          }}
        />

        <div style={{ display: "flex", gap: "3rem" }} className="exp-layout">
          {/* Timeline spine */}
          <div
            style={{
              position: "relative",
              width: "2px",
              flexShrink: 0,
              background: "rgba(245,158,11,0.12)",
              borderRadius: "2px",
            }}
          >
            <div
              ref={lineRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "0%",
                background:
                  "linear-gradient(to bottom, var(--indigo), var(--cyan))",
                borderRadius: "2px",
                transition: "height 0.1s linear",
              }}
            />
          </div>

          {/* Cards */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem",
            }}
          >
            {experience.map((item, i) => (
              <div
                key={i}
                className="exp-item"
                style={{
                  padding: "2rem",
                  borderRadius: "16px",
                  background: "rgba(5,5,8,0.6)",
                  border: "1px solid rgba(245,158,11,0.12)",
                  backdropFilter: "blur(12px)",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(245,158,11,0.45)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 0 40px rgba(245,158,11,0.12), inset 0 0 40px rgba(245,158,11,0.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(245,158,11,0.12)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Dot on spine */}
                <div
                  className="exp-dot"
                  style={{
                    position: "absolute",
                    left: "calc(-3rem - 6px)",
                    top: "2rem",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "var(--indigo)",
                    border: "2px solid var(--bg)",
                    boxShadow: "0 0 8px var(--indigo)",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontWeight: 700,
                        fontSize: "1.15rem",
                        color: "var(--text-primary)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item.role}
                    </h3>
                    <p
                      style={{
                        color: "var(--indigo-light)",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        marginTop: "0.15rem",
                      }}
                    >
                      {item.company}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-secondary)",
                        fontFamily: "monospace",
                      }}
                    >
                      {item.period}
                    </span>
                    <br />
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-secondary)",
                        opacity: 0.7,
                      }}
                    >
                      {item.location}
                    </span>
                  </div>
                </div>

                <ul
                  style={{
                    listStyle: "none",
                    marginTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                  }}
                >
                  {item.bullets.map((b, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        color: "var(--text-secondary)",
                        fontSize: "0.9rem",
                        lineHeight: 1.65,
                      }}
                    >
                      <span
                        style={{
                          color: "var(--cyan)",
                          flexShrink: 0,
                          marginTop: "0.1em",
                        }}
                      >
                        ▸
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginTop: "1.25rem",
                  }}
                >
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        background: "rgba(245,158,11,0.1)",
                        border: "1px solid rgba(245,158,11,0.2)",
                        color: "var(--indigo-light)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .exp-layout { gap: 1.5rem !important; }
          .exp-dot { left: calc(-1.5rem - 6px) !important; }
        }
      `}</style>
    </section>
  );
}
