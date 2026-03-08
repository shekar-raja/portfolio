"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.opacity = "1";
    ring.style.opacity = "1";

    let mouseX = -200,
      mouseY = -200;
    let ringX = -200,
      ringY = -200;
    let rafId = 0;
    let isHovering = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onEnter = () => {
      isHovering = true;
    };
    const onLeave = () => {
      isHovering = false;
    };

    // Attach hover detection to interactive elements
    const addHoverListeners = () => {
      document
        .querySelectorAll("a, button, [data-cursor-hover]")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };

    addHoverListeners();

    // Observe DOM mutations so dynamically rendered elements also get listeners
    const mutObs = new MutationObserver(addHoverListeners);
    mutObs.observe(document.body, { childList: true, subtree: true });

    const tick = () => {
      rafId = requestAnimationFrame(tick);

      // Dot snaps immediately
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;

      // Ring follows with spring lag (lerp factor 0.12)
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      const ringSize = isHovering ? 56 : 36;
      const ringOffset = ringSize / 2;
      ring.style.transform = `translate(${ringX - ringOffset}px, ${ringY - ringOffset}px)`;
      ring.style.width = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;

      // Dot shrinks when hovering (ring expands instead)
      dot.style.transform = `translate(${mouseX - (isHovering ? 2 : 4)}px, ${mouseY - (isHovering ? 2 : 4)}px) scale(${isHovering ? 0.5 : 1})`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      mutObs.disconnect();
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "var(--indigo-light)",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          transition:
            "transform 0.05s linear, opacity 0.3s, width 0.2s, height 0.2s",
          boxShadow: "0 0 8px var(--indigo)",
          mixBlendMode: "difference",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1.5px solid rgba(245,158,11,0.6)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0,
          transition:
            "width 0.25s ease, height 0.25s ease, border-color 0.25s, opacity 0.3s",
        }}
      />
    </>
  );
}
