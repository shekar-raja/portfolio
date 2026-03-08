"use client";
import { useEffect, useRef } from "react";
import portfolioConfig from "@/data/portfolio.config";

const education = portfolioConfig.education;

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".edu-card");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("edu-visible");
        });
      },
      { threshold: 0.25 },
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="education"
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
        .edu-card {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .edu-card.edu-visible { opacity: 1; transform: none; }
        .edu-card:nth-child(1) { transition-delay: 0.05s; }
        .edu-card:nth-child(2) { transition-delay: 0.2s; }
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
          Education
        </p>
        <h2
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginBottom: "3.5rem",
          }}
        >
          Academic background
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
          className="edu-grid"
        >
          {education.map((edu, i) => (
            <div key={i} className="edu-card">
              <div
                style={{
                  padding: "2rem",
                  borderRadius: "16px",
                  background: "rgba(5,5,8,0.6)",
                  border: `1px solid ${edu.accent}1a`,
                  backdropFilter: "blur(12px)",
                  borderTop: `2px solid ${edu.accent}`,
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `0 0 30px ${edu.accent}12`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <h3
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "var(--text-primary)",
                    marginBottom: "0.35rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {edu.degree}
                </h3>
                <p
                  style={{
                    color: edu.accent,
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {edu.institution}
                </p>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--text-secondary)",
                    opacity: 0.7,
                    marginBottom: "1rem",
                    fontFamily: "monospace",
                  }}
                >
                  {edu.period} · {edu.location}
                </p>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                  }}
                >
                  {edu.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .edu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
