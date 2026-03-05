"use client";
import { useEffect, useRef } from "react";
import portfolioConfig from "@/data/portfolio.config";
import CharReveal from "@/components/CharReveal";

const skillGroups = portfolioConfig.skills;

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".skill-card");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("skill-visible");
          }
        });
      },
      { threshold: 0.2 },
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  // Magnetic skill tags
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const MAG_RADIUS = 110;
    const MAG_STRENGTH = 14;

    const onMove = (e: MouseEvent) => {
      const tags = grid.querySelectorAll<HTMLElement>(".skill-tag");
      tags.forEach((tag) => {
        const rect = tag.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAG_RADIUS) {
          const factor = (1 - dist / MAG_RADIUS) * MAG_STRENGTH;
          tag.style.transform = `translate(${(dx / dist) * factor}px, ${(dy / dist) * factor}px)`;
        } else {
          tag.style.transform = "translate(0,0)";
        }
      });
    };

    const onLeave = () => {
      const tags = grid.querySelectorAll<HTMLElement>(".skill-tag");
      tags.forEach((tag) => {
        tag.style.transform = "translate(0,0)";
      });
    };

    grid.addEventListener("mousemove", onMove);
    grid.addEventListener("mouseleave", onLeave);
    return () => {
      grid.removeEventListener("mousemove", onMove);
      grid.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: "8rem 0",
        background: "rgba(4,4,10,0.93)",
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <style>{`
        .skill-card {
          opacity: 0;
          transform: translateY(36px) scale(0.97);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .skill-card.skill-visible {
          opacity: 1;
          transform: none;
        }
        .skill-card:nth-child(1) { transition-delay: 0.05s; }
        .skill-card:nth-child(2) { transition-delay: 0.12s; }
        .skill-card:nth-child(3) { transition-delay: 0.19s; }
        .skill-card:nth-child(4) { transition-delay: 0.26s; }
        .skill-card:nth-child(5) { transition-delay: 0.33s; }
        .skill-card:nth-child(6) { transition-delay: 0.40s; }
        .skill-inner:hover {
          border-color: rgba(99,102,241,0.45) !important;
          box-shadow: 0 0 40px rgba(99,102,241,0.1) !important;
          transform: translateY(-4px) !important;
        }
        .skill-tag:hover {
          background: rgba(99,102,241,0.2) !important;
        }
        .skill-tag {
          transition: background 0.2s, transform 0.12s ease !important;
          will-change: transform;
        }
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
          Skills
        </p>
        <CharReveal
          text="Tools of the trade"
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginBottom: "3.5rem",
            display: "block",
          }}
        />

        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
          className="skills-grid"
        >
          {skillGroups.map((group) => (
            <div key={group.category} className="skill-card">
              <div
                className="skill-inner"
                style={{
                  padding: "1.75rem",
                  borderRadius: "16px",
                  background: "rgba(13,13,20,0.6)",
                  border: "1px solid rgba(99,102,241,0.12)",
                  backdropFilter: "blur(12px)",
                  transition:
                    "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: `${group.color}15`,
                      border: `1px solid ${group.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                    }}
                  >
                    {group.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "var(--text-primary)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {group.category}
                  </h3>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag"
                      style={{
                        padding: "0.3rem 0.7rem",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        background: `${group.color}0d`,
                        border: `1px solid ${group.color}20`,
                        color: "var(--text-secondary)",
                        cursor: "default",
                        transition: "background 0.2s",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
