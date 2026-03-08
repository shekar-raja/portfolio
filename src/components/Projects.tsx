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

  useEffect(() => {
    const containers = document.querySelectorAll<HTMLDivElement>(".proj-desc");
    const rafMap = new Map<HTMLDivElement, number>();
    const pausedMap = new Map<HTMLDivElement, boolean>();
    const resumeTimers = new Map<
      HTMLDivElement,
      ReturnType<typeof setTimeout>
    >();

    const SCROLL_SPEED = 0.18; // px per frame — slow, comfortable reading pace

    const startScroll = (el: HTMLDivElement) => {
      const tick = () => {
        if (!pausedMap.get(el) && el.scrollHeight > el.clientHeight) {
          el.scrollTop += SCROLL_SPEED;
          if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) {
            el.scrollTop = 0;
          }
        }
        rafMap.set(el, requestAnimationFrame(tick));
      };
      rafMap.set(el, requestAnimationFrame(tick));
    };

    containers.forEach((el) => {
      pausedMap.set(el, false);
      startScroll(el);

      el.addEventListener("mouseenter", () => {
        pausedMap.set(el, true);
        el.style.overflowY = "auto";
      });
      el.addEventListener("mouseleave", () => {
        // Resume auto-scroll only if no pending user-scroll timer
        if (!resumeTimers.has(el)) {
          pausedMap.set(el, false);
        }
        el.style.overflowY = "hidden";
      });

      // Allow manual wheel scrolling at any time
      el.addEventListener(
        "wheel",
        (e: WheelEvent) => {
          e.preventDefault();
          e.stopPropagation();
          el.scrollTop += e.deltaY * 0.4;
          // Clamp
          el.scrollTop = Math.max(
            0,
            Math.min(el.scrollTop, el.scrollHeight - el.clientHeight),
          );
          // Pause auto-scroll, then resume 2s after last wheel input
          pausedMap.set(el, true);
          clearTimeout(resumeTimers.get(el));
          resumeTimers.set(
            el,
            setTimeout(() => {
              resumeTimers.delete(el);
              if (!el.matches(":hover")) {
                pausedMap.set(el, false);
              }
            }, 2000),
          );
        },
        { passive: false },
      );
    });

    return () => {
      rafMap.forEach((id) => cancelAnimationFrame(id));
      resumeTimers.forEach((id) => clearTimeout(id));
    };
  }, []);

  return (
    <section
      id="projects"
      style={{
        padding: "8rem 0",
        background: "rgba(4,4,10,0.62)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderTop: "1px solid rgba(245,158,11,0.15)",
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
                height: "420px",
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
                  background: "rgba(8,8,18,0.52)",
                  border: `1px solid ${project.accent}22`,
                  backdropFilter: "blur(18px) saturate(160%)",
                  WebkitBackdropFilter: "blur(18px) saturate(160%)",
                  cursor: "default",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                  position: "relative",
                  overflow: "hidden",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = `${project.accent}66`;
                  el.style.boxShadow = `0 0 40px ${project.accent}28, 0 24px 60px ${project.accent}18`;
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
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minHeight: 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-start",
                      marginBottom: "1rem",
                    }}
                  >
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

                  <div
                    className="proj-desc"
                    style={{
                      flex: 1,
                      overflowY: "hidden",
                      marginBottom: "1.25rem",
                      minHeight: 0,
                    }}
                  >
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.875rem",
                        lineHeight: 1.7,
                      }}
                    >
                      {project.description}
                    </p>
                  </div>

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
        .proj-desc::-webkit-scrollbar { display: none; }
        .proj-desc { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
