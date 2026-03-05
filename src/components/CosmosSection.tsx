"use client";
import { useEffect, useRef } from "react";

function isMobile() {
  return typeof window !== "undefined" && window.innerWidth < 900;
}

const PALETTE = [
  "#818cf8", // indigo-light
  "#6366f1", // indigo
  "#22d3ee", // cyan
  "#a78bfa", // violet
  "#c4b5fd", // violet-light
  "#94a3b8", // slate
  "#e2e8f0", // near-white
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

export default function CosmosSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const isVisible = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = isMobile();
    const dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const PC = mobile ? 110 : 240;

    let W = section.clientWidth;
    let H = section.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    // ── Particles ────────────────────────────────────────────────────────────
    const particles: Particle[] = Array.from({ length: PC }, () => {
      const baseVx = (Math.random() - 0.5) * 0.28;
      const baseVy = (Math.random() - 0.5) * 0.28;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: baseVx,
        vy: baseVy,
        baseVx,
        baseVy,
        size: 0.5 + Math.random() * 1.8,
        opacity: 0.15 + Math.random() * 0.6,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      };
    });

    // ── Shooting stars ───────────────────────────────────────────────────────
    const stars: ShootingStar[] = [];
    let nextShootFrame = 60 + Math.floor(Math.random() * 100);
    let frame = 0;

    function spawnStar() {
      const angle = (15 + Math.random() * 35) * (Math.PI / 180);
      const speed = 7 + Math.random() * 9;
      const fromRight = Math.random() > 0.5;
      const x = fromRight ? W + 20 : Math.random() * W * 0.75;
      const y = fromRight ? Math.random() * H * 0.45 : -20;
      const maxLife = 70 + Math.floor(Math.random() * 60);
      stars.push({
        x,
        y,
        vx: fromRight ? -Math.cos(angle) * speed : Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        speed,
        life: maxLife,
        maxLife,
      });
    }

    // ── Mouse ────────────────────────────────────────────────────────────────
    const mouse = { x: -2000, y: -2000 };
    const REPEL_R = 120;
    const REPEL_F = 1.1;

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // ── Scroll ───────────────────────────────────────────────────────────────
    let prevScrollY = window.scrollY;
    let scrollKick = 0;

    // ── Resize ───────────────────────────────────────────────────────────────
    const onResize = () => {
      W = section.clientWidth;
      H = section.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // ── Visibility ───────────────────────────────────────────────────────────
    const visObs = new IntersectionObserver(
      ([e]) => {
        isVisible.current = e.isIntersecting;
      },
      { threshold: 0 },
    );
    visObs.observe(section);

    const FRAME_MS = mobile ? 1000 / 30 : 0;
    let lastFrame = 0;

    // ── Render loop ──────────────────────────────────────────────────────────
    const animate = (ts: number) => {
      rafRef.current = requestAnimationFrame(animate);
      if (!isVisible.current) return;
      if (FRAME_MS > 0 && ts - lastFrame < FRAME_MS) return;
      lastFrame = ts;
      frame++;

      // Scroll delta → decaying kick
      const sy = window.scrollY;
      const sdelta = sy - prevScrollY;
      prevScrollY = sy;
      scrollKick = scrollKick * 0.88 + sdelta * 0.28;

      ctx.clearRect(0, 0, W, H);

      // ── Particles ──────────────────────────────────────────────────────────
      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL_R * REPEL_R && d2 > 0) {
          const dist = Math.sqrt(d2);
          const f = ((REPEL_R - dist) / REPEL_R) * REPEL_F;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }

        // Scroll kick: scrolling down pushes particles upward (space-warp feel)
        p.vy -= scrollKick * 0.02;

        // Ease back to base velocity
        p.vx += (p.baseVx - p.vx) * 0.048;
        p.vy += (p.baseVy - p.vy) * 0.048;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
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
      if (frame >= nextShootFrame && stars.length < 4) {
        spawnStar();
        nextShootFrame = frame + 80 + Math.floor(Math.random() * 140);
      }

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life--;

        const progress = s.life / s.maxLife; // 1 → 0
        const elapsed = s.maxLife - s.life;
        const tailLen = Math.min(elapsed * 2.8, 140);
        const tx = s.x - (s.vx / s.speed) * tailLen;
        const ty = s.y - (s.vy / s.speed) * tailLen;

        // Tail — linear gradient from transparent to bright white
        const grad = ctx.createLinearGradient(tx, ty, s.x, s.y);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.65, `rgba(210,205,255,${0.22 * progress})`);
        grad.addColorStop(1, `rgba(255,255,255,${0.88 * progress})`);

        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = mobile ? 1 : 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Glowing head
        const hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 5);
        hg.addColorStop(0, `rgba(255,255,255,${progress * 0.95})`);
        hg.addColorStop(0.5, `rgba(195,185,255,${progress * 0.35})`);
        hg.addColorStop(1, "rgba(180,170,255,0)");
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
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
      window.removeEventListener("resize", onResize);
      visObs.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 50% 40%, rgba(10,6,22,1) 0%, rgba(4,2,9,1) 55%, rgba(2,1,5,1) 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, display: "block" }}
      />

      {/* Top fade from previous section */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "130px",
          background: "linear-gradient(to bottom, rgba(6,4,12,1), transparent)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Bottom fade into next section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "130px",
          background: "linear-gradient(to top, rgba(6,4,12,1), transparent)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </section>
  );
}
