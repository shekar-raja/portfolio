"use client";
import { useEffect, useRef } from "react";
import portfolioConfig from "@/data/portfolio.config";

const testimonials = portfolioConfig.testimonials;

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".testimonial-card");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("testimonial-visible");
        });
      },
      { threshold: 0.2 },
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="testimonials"
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
        .testimonial-card {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .testimonial-card.testimonial-visible {
          opacity: 1;
          transform: none;
        }
        .testimonial-card:nth-child(1) { transition-delay: 0.05s; }
        .testimonial-card:nth-child(2) { transition-delay: 0.2s; }
        .testimonial-card:nth-child(3) { transition-delay: 0.35s; }
        .testimonial-card:nth-child(4) { transition-delay: 0.5s; }

        @media (max-width: 768px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Section label */}
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
          Testimonials
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
          What people say
        </h2>

        <div
          className="testimonials-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div
                style={{
                  height: "100%",
                  padding: "2rem",
                  borderRadius: "16px",
                  background: "rgba(5,5,8,0.6)",
                  border: `1px solid ${t.accent}22`,
                  borderTop: `2px solid ${t.accent}`,
                  backdropFilter: "blur(12px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `0 0 32px ${t.accent}18`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Quote mark */}
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "4rem",
                    lineHeight: 1,
                    color: t.accent,
                    opacity: 0.4,
                    display: "block",
                    marginBottom: "-1rem",
                    userSelect: "none",
                  }}
                >
                  &ldquo;
                </span>

                {/* Quote text */}
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.925rem",
                    lineHeight: 1.8,
                    flex: 1,
                  }}
                >
                  {t.quote}
                </p>

                {/* Author row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Avatar initials */}
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: `${t.accent}22`,
                      border: `1.5px solid ${t.accent}55`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontFamily: "Sora, sans-serif",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      color: t.accent,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t.initials}
                  </div>

                  <div>
                    {t.linkedin ? (
                      <a
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "Sora, sans-serif",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          color: "var(--text-primary)",
                          marginBottom: "0.2rem",
                          display: "block",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            t.accent;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            "var(--text-primary)";
                        }}
                      >
                        {t.name}
                      </a>
                    ) : (
                      <p
                        style={{
                          fontFamily: "Sora, sans-serif",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          color: "var(--text-primary)",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {t.name}
                      </p>
                    )}
                    <p
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--text-secondary)",
                        opacity: 0.65,
                      }}
                    >
                      {t.role} · {t.relationship}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
