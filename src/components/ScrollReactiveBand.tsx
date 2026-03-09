"use client";
import { useEffect, useRef } from "react";
import portfolioConfig from "@/data/portfolio.config";
import { getSkillMeta } from "@/data/skillIcons";

// Only include skills that have an icon resolved
const allSkills = portfolioConfig.skills
  .flatMap((g) => g.skills)
  .filter((s) => {
    const { icon } = getSkillMeta(s);
    return icon !== null;
  });

// Deduplicate while preserving order
const uniqueSkills = [...new Set(allSkills)];

const ROW_COUNT = 2;
const rows: string[][] = Array.from({ length: ROW_COUNT }, (_, i) =>
  uniqueSkills.filter((_, idx) => idx % ROW_COUNT === i),
);

// Per-row config: base drift speed (px/frame) and scroll-delta multiplier
const ROW_CONFIG = [
  { speed: 0.3, scrollFactor: 0.7 },
  { speed: -0.25, scrollFactor: -0.6 },
];

export default function ScrollReactiveBand() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsets = useRef<number[]>(Array(ROW_COUNT).fill(0));
  const prevScroll = useRef<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Seed offsets so each row starts at a different phase
    offsets.current = [0, -300, -150, -450];
    prevScroll.current = window.scrollY;

    const animate = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - prevScroll.current;
      prevScroll.current = currentScroll;

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const { speed, scrollFactor } = ROW_CONFIG[i];
        // Half because we duplicate the list for seamless looping
        const setWidth = row.scrollWidth / 2;
        if (setWidth === 0) return;

        offsets.current[i] += speed + delta * scrollFactor;

        // Wrap seamlessly
        if (offsets.current[i] > 0) offsets.current[i] -= setWidth;
        if (offsets.current[i] < -setWidth) offsets.current[i] += setWidth;

        row.style.transform = `translateX(${offsets.current[i]}px)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "3.5rem 0",
        background: "rgba(6,4,12,0.97)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Top fade from hero */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Left + right edge fades */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(6,4,12,1) 0%, transparent 12%, transparent 88%, rgba(6,4,12,1) 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Subtle label */}
      <p
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "Sora, sans-serif",
          fontWeight: 700,
          fontSize: "0.7rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.12)",
          whiteSpace: "nowrap",
          zIndex: 3,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        Technologies &amp; Tools
      </p>

      {/* Rows */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {rows.map((row, i) => (
          <div key={i} style={{ overflow: "visible", position: "relative" }}>
            <div
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              style={{
                display: "flex",
                gap: "1rem",
                width: "max-content",
                willChange: "transform",
                alignItems: "stretch",
              }}
            >
              {/* Duplicate for seamless loop */}
              {[...row, ...row].map((skill, j) => {
                const { icon: Icon, color: iconColor } = getSkillMeta(skill);
                return (
                  <span
                    key={j}
                    style={{
                      width: "90px",
                      padding: "1rem 0.5rem 0.85rem",
                      borderRadius: "14px",
                      border: `1px solid ${
                        i % 2 === 0
                          ? "rgba(245,158,11,0.18)"
                          : "rgba(45,212,191,0.16)"
                      }`,
                      background:
                        i % 2 === 0
                          ? "rgba(245,158,11,0.05)"
                          : "rgba(45,212,191,0.04)",
                      userSelect: "none",
                      display: "inline-flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.55rem",
                    }}
                  >
                    {Icon && (
                      <Icon
                        size={30}
                        color={iconColor ?? undefined}
                        style={{ flexShrink: 0, opacity: 0.88 }}
                      />
                    )}
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontFamily: "Sora, sans-serif",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                        color:
                          i % 2 === 0
                            ? "rgba(165,180,252,0.7)"
                            : "rgba(103,232,249,0.7)",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                        lineHeight: 1.2,
                      }}
                    >
                      {skill}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom fade into About */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "linear-gradient(to top, rgba(6,4,12,0.95), transparent)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </div>
  );
}
