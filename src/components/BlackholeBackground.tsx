"use client";
import { useEffect, useRef } from "react";

export default function BlackholeBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentX = useRef(0);
  const targetX = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const frac = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      // centre → left → centre → right → centre over full page scroll
      targetX.current = -15 * Math.sin(frac * Math.PI * 2);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    function tick() {
      rafRef.current = requestAnimationFrame(tick);
      currentX.current += (targetX.current - currentX.current) * 0.03;
      if (video) {
        video.style.transform = `translate(-50%, -50%) translateX(${currentX.current.toFixed(3)}vw)`;
      }
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background: "#000",
      }}
    >
      {/* Actual Gargantua footage */}
      <video
        ref={videoRef}
        src="/portfolio/videos/gargantua_loop.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "120vw",
          minHeight: "100vh",
          width: "auto",
          height: "auto",
          objectFit: "cover",
          opacity: 1,
          willChange: "transform",
        }}
      />
      {/* Edge vignette — keeps text readable without dimming the centre */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 72% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.60) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
