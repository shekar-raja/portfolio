"use client";
import { useEffect, useRef } from "react";

function isMobile() {
  return typeof window !== "undefined" && window.innerWidth < 900;
}

const PALETTE = [
  "#fbbf24", // disk gold
  "#f59e0b", // disk amber
  "#2dd4bf", // lensing teal
  "#f97316", // inner disk orange
  "#fde68a", // warm highlight
  "#94a3b8", // stellar grey
  "#e2e8f0", // near-white star
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  opacity: number;
  color: string;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  life: number;
  maxLife: number;
};

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = isMobile();
    const dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const PC = mobile ? 80 : 180;

    let W = window.innerWidth;
    let H = window.innerHeight;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.scale(dpr, dpr);
    }
    resize();

    // ── Particles ────────────────────────────────────────────────────────────
    const particles: Particle[] = Array.from({ length: PC }, () => {
      const baseVx = (Math.random() - 0.5) * 0.22;
      const baseVy = (Math.random() - 0.5) * 0.22;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: baseVx,
        vy: baseVy,
        baseVx,
        baseVy,
        size: 0.4 + Math.random() * 1.6,
        // Low opacity — these are background hints, not foreground elements
        opacity: 0.06 + Math.random() * 0.22,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      };
    });

    // ── Shooting stars ───────────────────────────────────────────────────────
    const stars: ShootingStar[] = [];
    let nextShootFrame = 90 + Math.floor(Math.random() * 140);
    let frame = 0;

    function spawnStar() {
      const angle = (18 + Math.random() * 30) * (Math.PI / 180);
      const speed = 6 + Math.random() * 8;
      const fromRight = Math.random() > 0.5;
      stars.push({
        x: fromRight ? W + 20 : Math.random() * W * 0.8,
        y: fromRight ? Math.random() * H * 0.5 : -20,
        vx: fromRight ? -Math.cos(angle) * speed : Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        speed,
        life: 80 + Math.floor(Math.random() * 70),
        maxLife: 80 + Math.floor(Math.random() * 70),
      });
    }

    // ── Mouse ────────────────────────────────────────────────────────────────
    const mouse = { x: -9999, y: -9999 };
    const REPEL_R = 110;
    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // ── Scroll ───────────────────────────────────────────────────────────────
    let prevScrollY = window.scrollY;
    let scrollKick = 0;

    // ── Visibility ───────────────────────────────────────────────────────────
    let paused = false;
    const onVisibility = () => {
      paused = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    window.addEventListener("resize", resize, { passive: true });

    const FRAME_MS = mobile ? 1000 / 30 : 0;
    let lastFrame = 0;

    // ── Render loop ──────────────────────────────────────────────────────────
    const animate = (ts: number) => {
      rafRef.current = requestAnimationFrame(animate);
      if (paused) return;
      if (FRAME_MS > 0 && ts - lastFrame < FRAME_MS) return;
      lastFrame = ts;
      frame++;

      const sy = window.scrollY;
      scrollKick = scrollKick * 0.88 + (sy - prevScrollY) * 0.25;
      prevScrollY = sy;

      ctx.clearRect(0, 0, W, H);

      // ── Particles ──────────────────────────────────────────────────────────
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL_R * REPEL_R && d2 > 0) {
          const dist = Math.sqrt(d2);
          const f = ((REPEL_R - dist) / REPEL_R) * 0.9;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }

        // Scroll: downward scroll pushes particles upward (warp feel)
        p.vy -= scrollKick * 0.018;

        // Ease back to base
        p.vx += (p.baseVx - p.vx) * 0.046;
        p.vy += (p.baseVy - p.vy) * 0.046;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -4) p.x = W + 4;
        else if (p.x > W + 4) p.x = -4;
        if (p.y < -4) p.y = H + 4;
        else if (p.y > H + 4) p.y = -4;

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Shooting stars ────────────────────────────────────────────────────
      if (frame >= nextShootFrame && stars.length < 3) {
        spawnStar();
        nextShootFrame = frame + 110 + Math.floor(Math.random() * 180);
      }

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life--;

        const progress = s.life / s.maxLife;
        const elapsed = s.maxLife - s.life;
        const tailLen = Math.min(elapsed * 2.5, 130);
        const tx = s.x - (s.vx / s.speed) * tailLen;
        const ty = s.y - (s.vy / s.speed) * tailLen;

        const grad = ctx.createLinearGradient(tx, ty, s.x, s.y);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.6, `rgba(200,195,255,${0.18 * progress})`);
        grad.addColorStop(1, `rgba(255,255,255,${0.75 * progress})`);

        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = mobile ? 1 : 1.4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        const hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 4.5);
        hg.addColorStop(0, `rgba(255,255,255,${progress * 0.85})`);
        hg.addColorStop(0.5, `rgba(190,180,255,${progress * 0.3})`);
        hg.addColorStop(1, "rgba(180,170,255,0)");
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 4.5, 0, Math.PI * 2);
        ctx.fill();

        if (s.life <= 0 || s.x < -100 || s.x > W + 100 || s.y > H + 100) {
          stars.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
