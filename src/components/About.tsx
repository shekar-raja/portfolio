"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import portfolioConfig from "@/data/portfolio.config";

const { about, personal } = portfolioConfig;

function parseStatValue(val: string): { num: number; suffix: string } {
  const match = val.match(/^([\d.]+)(.*)$/);
  if (!match) return { num: 0, suffix: val };
  return { num: parseFloat(match[1]), suffix: match[2] };
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            entry.target.querySelectorAll(".about-reveal").forEach((el, i) => {
              (el as HTMLElement).style.transitionDelay = `${i * 0.12}s`;
              (el as HTMLElement).classList.add("revealed");
            });

            // Count-up on stat values
            entry.target
              .querySelectorAll<HTMLElement>(".stat-value")
              .forEach((el) => {
                const target = parseFloat(el.dataset.target ?? "0");
                const suffix = el.dataset.suffix ?? "";
                const decimals = target % 1 !== 0 ? 2 : 0;
                const duration = 1500;
                const start = performance.now();
                function tick(now: number) {
                  const elapsed = now - start;
                  const progress = Math.min(elapsed / duration, 1);
                  const eased = 1 - Math.pow(1 - progress, 3);
                  const val = target * eased;
                  el.textContent = val.toFixed(decimals) + suffix;
                  if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
              });
          }
        });
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: "8rem 0",
        background: "rgba(4,4,10,0.78)",
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <style>{`
        .about-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .about-reveal.revealed {
          opacity: 1;
          transform: none;
        }
      `}</style>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        {/* Section label */}
        <p
          className="about-reveal"
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
          About
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Text */}
          <div>
            <h2
              className="about-reveal"
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                marginBottom: "1.5rem",
              }}
            >
              {about.heading}
            </h2>

            {about.bio.map((paragraph, i) => (
              <p
                key={i}
                className="about-reveal"
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  marginBottom: i < about.bio.length - 1 ? "1.25rem" : "2rem",
                  fontSize: "1rem",
                }}
              >
                {paragraph}
              </p>
            ))}

            {/* Stat chips */}
            <div
              className="about-reveal"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
              }}
            >
              {about.stats.map((s) => {
                const { num, suffix } = parseStatValue(s.value);
                const decimals = num % 1 !== 0 ? 2 : 0;
                return (
                  <div
                    key={s.label}
                    style={{
                      padding: "1.25rem",
                      borderRadius: "12px",
                      background: "rgba(99,102,241,0.06)",
                      border: "1px solid rgba(99,102,241,0.15)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontWeight: 800,
                        fontSize: "1.75rem",
                        background:
                          "linear-gradient(135deg, var(--indigo-light), var(--cyan))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      <span
                        className="stat-value"
                        data-target={String(num)}
                        data-suffix={suffix}
                      >
                        {"0" + (decimals > 0 ? ".00" : "") + suffix}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-secondary)",
                        marginTop: "0.25rem",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Headshot */}
          <div
            className="about-reveal"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                position: "relative",
                width: "280px",
                height: "280px",
              }}
            >
              {/* Orbital rings */}
              <div
                style={{
                  position: "absolute",
                  inset: "-24px",
                  borderRadius: "50%",
                  border: "1px solid rgba(99,102,241,0.2)",
                  animation: "orbit 8s linear infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "-48px",
                  borderRadius: "50%",
                  border: "1px solid rgba(34,211,238,0.12)",
                  animation: "orbit 14s linear infinite reverse",
                }}
              />
              {/* Floating dot on ring */}
              <div
                style={{
                  position: "absolute",
                  top: "-26px",
                  left: "50%",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--indigo)",
                  transform: "translateX(-50%)",
                  boxShadow: "0 0 10px var(--indigo)",
                }}
              />

              <div
                style={{
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid rgba(99,102,241,0.3)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Image
                  src={personal.avatar}
                  alt={personal.name}
                  width={280}
                  height={280}
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
