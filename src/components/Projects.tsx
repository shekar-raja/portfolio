"use client";
import { useEffect, useRef } from "react";
import portfolioConfig from "@/data/portfolio.config";

const { projects } = portfolioConfig;

export default function Projects() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    let currentX = 0;
    let paused = false;
    let rafId = 0;
    const SPEED = 0.55; // px per frame — comfortable reading pace

    const tick = () => {
      if (!paused) {
        currentX += SPEED;
        // Seamless loop: snap back when we've scrolled one full copy
        const halfWidth = strip.scrollWidth / 2;
        if (currentX >= halfWidth) currentX -= halfWidth;
        strip.style.transform = `translateX(${-currentX}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };

    strip.addEventListener("mouseenter", pause);
    strip.addEventListener("mouseleave", resume);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      strip.removeEventListener("mouseenter", pause);
      strip.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section
      id="projects"
      style={{
        padding: "8rem 0",
        background: "rgba(4,4,10,0.93)",
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
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
          Projects
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <h2
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
            }}
          >
            Things I&apos;ve built
          </h2>
        </div>
      </div>

      {/* Horizontal scroll strip — transform-based for RAF lerp */}
      <div style={{ overflow: "hidden" }}>
        <div
          ref={stripRef}
          style={{
            display: "flex",
            gap: "1.5rem",
            paddingLeft: "max(2rem, calc((100vw - 1200px) / 2 + 2rem))",
            paddingRight: "2rem",
            paddingBottom: "1rem",
            willChange: "transform",
          }}
          className="projects-strip"
        >
          {[...projects, ...projects].map((project, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: "360px",
                perspective: "900px",
              }}
              onMouseMove={(e) => {
                const outer = e.currentTarget as HTMLDivElement;
                const card = outer.querySelector(
                  ".proj-card",
                ) as HTMLDivElement | null;
                const glowEl = outer.querySelector(
                  ".proj-glow",
                ) as HTMLDivElement | null;
                if (!card || !glowEl) return;
                const rect = outer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xPct = x / rect.width - 0.5;
                const yPct = y / rect.height - 0.5;
                // No CSS transition during active tracking — instant response
                card.style.transition = "border-color 0.3s, box-shadow 0.3s";
                card.style.transform = `rotateY(${xPct * 14}deg) rotateX(${-yPct * 10}deg) translateZ(6px)`;
                glowEl.style.left = `${x}px`;
                glowEl.style.top = `${y}px`;
                glowEl.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const outer = e.currentTarget as HTMLDivElement;
                const card = outer.querySelector(
                  ".proj-card",
                ) as HTMLDivElement | null;
                const glowEl = outer.querySelector(
                  ".proj-glow",
                ) as HTMLDivElement | null;
                if (!card || !glowEl) return;
                // Smooth spring-back only on leave
                card.style.transition =
                  "transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, box-shadow 0.3s";
                card.style.transform =
                  "rotateY(0deg) rotateX(0deg) translateZ(0)";
                card.style.borderColor = `${project.accent}22`;
                card.style.boxShadow = "none";
                glowEl.style.opacity = "0";
              }}
            >
              <div
                className="proj-card"
                style={{
                  padding: "2rem",
                  borderRadius: "20px",
                  background: "rgba(13,13,20,0.92)",
                  border: `1px solid ${project.accent}22`,
                  backdropFilter: "blur(8px)",
                  cursor: "default",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                  position: "relative",
                  overflow: "hidden",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = `${project.accent}55`;
                  el.style.boxShadow = `0 24px 64px ${project.accent}18`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = `${project.accent}22`;
                  el.style.boxShadow = "none";
                }}
              >
                {/* Cursor-following inner glow */}
                <div
                  className="proj-glow"
                  style={{
                    position: "absolute",
                    width: "240px",
                    height: "240px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${project.accent}22 0%, transparent 65%)`,
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                    opacity: 0,
                    transition: "opacity 0.3s",
                    zIndex: 0,
                  }}
                />

                {/* Accent top line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
                    zIndex: 1,
                  }}
                />

                {/* Card content */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: `${project.accent}18`,
                        border: `1px solid ${project.accent}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                      }}
                    >
                      {["🤖", "⚡", "🔭", "💬", "🎨", "📊"][i % 6]}
                    </div>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "var(--text-secondary)",
                          textDecoration: "none",
                          fontSize: "1.1rem",
                          opacity: 0.6,
                          transition: "opacity 0.2s, color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLAnchorElement;
                          el.style.opacity = "1";
                          el.style.color = project.accent;
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLAnchorElement;
                          el.style.opacity = "0.6";
                          el.style.color = "var(--text-secondary)";
                        }}
                      >
                        ↗
                      </a>
                    )}
                  </div>

                  <h3
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "var(--text-primary)",
                      letterSpacing: "-0.01em",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {project.description}
                  </p>

                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: "0.2rem 0.6rem",
                          borderRadius: "20px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          background: `${project.accent}10`,
                          border: `1px solid ${project.accent}25`,
                          color: project.accent,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .projects-strip { user-select: none; }
      `}</style>
    </section>
  );
}
