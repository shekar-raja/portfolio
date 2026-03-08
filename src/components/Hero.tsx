"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import portfolioConfig from "@/data/portfolio.config";

const { personal, hero } = portfolioConfig;

// Detect low-power devices (mobile/tablet)
function isMobile() {
  return typeof window !== "undefined" && window.innerWidth < 900;
}

export default function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const mobile = isMobile();
    const PARTICLE_COUNT = mobile ? 60 : 110;
    const THRESHOLD = mobile ? 1.8 : 2.0;
    const MAX_LINES = Math.floor((PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2);

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      antialias: !mobile,
      alpha: true,
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    // --- Particles ---
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 2); // only x,y velocity
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      velocities[i * 2] = (Math.random() - 0.5) * 0.003;
      velocities[i * 2 + 1] = (Math.random() - 0.5) * 0.003;
    }

    const pointGeo = new THREE.BufferGeometry();
    const pointAttr = new THREE.BufferAttribute(positions, 3);
    pointAttr.setUsage(THREE.DynamicDrawUsage);
    pointGeo.setAttribute("position", pointAttr);

    const pointMat = new THREE.PointsMaterial({
      size: 0.055,
      color: 0x818cf8,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(pointGeo, pointMat));

    // --- Lines: pre-allocated single LineSegments (no per-frame allocation) ---
    const linePositions = new Float32Array(MAX_LINES * 6); // 2 verts × 3 floats per segment
    const lineColors = new Float32Array(MAX_LINES * 6); // per-vertex color for opacity
    const lineGeo = new THREE.BufferGeometry();
    const linePosAttr = new THREE.BufferAttribute(linePositions, 3);
    const lineColAttr = new THREE.BufferAttribute(lineColors, 3);
    linePosAttr.setUsage(THREE.DynamicDrawUsage);
    lineColAttr.setUsage(THREE.DynamicDrawUsage);
    lineGeo.setAttribute("position", linePosAttr);
    lineGeo.setAttribute("color", lineColAttr);
    lineGeo.setDrawRange(0, 0); // start with nothing drawn

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 1,
    });
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    // --- Mouse ---
    const mouse = { x: 0, y: 0 };
    let currentRotX = 0,
      currentRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // --- Animation loop ---
    let lastFrame = 0;
    const TARGET_FPS = mobile ? 30 : 60;
    const FRAME_MS = 1000 / TARGET_FPS;

    const animate = (timestamp: number) => {
      rafRef.current = requestAnimationFrame(animate);

      // Throttle on mobile
      if (timestamp - lastFrame < FRAME_MS) return;
      lastFrame = timestamp;

      // Update particle positions (in-place, no allocation)
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] += velocities[i * 2];
        positions[i * 3 + 1] += velocities[i * 2 + 1];
        if (positions[i * 3] > 6) positions[i * 3] = -6;
        if (positions[i * 3] < -6) positions[i * 3] = 6;
        if (positions[i * 3 + 1] > 4) positions[i * 3 + 1] = -4;
        if (positions[i * 3 + 1] < -4) positions[i * 3 + 1] = 4;
      }
      pointAttr.needsUpdate = true;

      // Rebuild line buffer in-place
      let lineCount = 0;
      const r = 0.38,
        g = 0.4,
        b = 0.95; // indigo colour
      for (let i = 0; i < PARTICLE_COUNT && lineCount < MAX_LINES; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT && lineCount < MAX_LINES; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < THRESHOLD) {
            const alpha = (1 - dist / THRESHOLD) * 0.28;
            const base = lineCount * 6;
            // Vertex A
            linePositions[base] = positions[i * 3];
            linePositions[base + 1] = positions[i * 3 + 1];
            linePositions[base + 2] = positions[i * 3 + 2];
            lineColors[base] = r * alpha;
            lineColors[base + 1] = g * alpha;
            lineColors[base + 2] = b * alpha;
            // Vertex B
            linePositions[base + 3] = positions[j * 3];
            linePositions[base + 4] = positions[j * 3 + 1];
            linePositions[base + 5] = positions[j * 3 + 2];
            lineColors[base + 3] = r * alpha;
            lineColors[base + 4] = g * alpha;
            lineColors[base + 5] = b * alpha;
            lineCount++;
          }
        }
      }
      lineGeo.setDrawRange(0, lineCount * 2);
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      // Smooth camera tilt from mouse
      currentRotX += (mouse.y * 0.12 - currentRotX) * 0.05;
      currentRotY += (mouse.x * 0.12 - currentRotY) * 0.05;
      scene.rotation.x = currentRotX;
      scene.rotation.y = currentRotY;

      renderer.render(scene, camera);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      // Explicit disposal — no leaks
      pointGeo.dispose();
      pointMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
    };
  }, []);

  // ── Scroll parallax + mouse-tracking glow ─────────────────────────────────
  useEffect(() => {
    const content = contentRef.current;
    const glow = glowRef.current;
    if (!content || !glow) return;

    const onScroll = () => {
      const y = window.scrollY;
      // Content drifts up at 38% of scroll speed — depth illusion
      content.style.transform = `translateY(${y * 0.38}px)`;
      // Fade out gently as user scrolls away
      content.style.opacity = String(Math.max(0, 1 - y / 520));
    };

    const onMouse = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 2;
      // Glow orb tracks mouse with a max offset of ±120px
      glow.style.transform = `translate(calc(-50% + ${xPct * 120}px), calc(-50% + ${yPct * 80}px))`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background:
          "linear-gradient(108deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.18) 68%, transparent 100%)",
      }}
    >
      <div
        ref={mountRef}
        style={{ position: "absolute", inset: 0, zIndex: 0, display: "none" }}
      />

      {/* Dark scrim — ensures text legibility against bright video */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(108deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.10) 65%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Radial glow — follows mouse */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(34,211,238,0.07) 45%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 2,
          transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />

      {/* Content — scroll parallax */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          width: "100%",
          willChange: "transform",
        }}
      >
        <div style={{ maxWidth: "720px" }}>
          <p
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 600,
              fontSize: "0.85rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--indigo-light)",
              marginBottom: "1.25rem",
              opacity: 0,
              animation: "fadeUp 0.8s 0.2s forwards",
            }}
          >
            Data · AI · Cloud
          </p>

          <h1
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "1rem",
              opacity: 0,
              animation: "fadeUp 0.8s 0.35s forwards",
            }}
          >
            {personal.name.split(" ").map((w, i) => (
              <span
                key={i}
                style={
                  i === 1
                    ? {
                        background:
                          "linear-gradient(135deg, var(--indigo-light) 0%, var(--cyan) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }
                    : {}
                }
              >
                {w}
                {i === 0 ? " " : ""}
              </span>
            ))}
          </h1>

          <h2
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              color: "var(--text-secondary)",
              marginBottom: "1.75rem",
              letterSpacing: "-0.01em",
              opacity: 0,
              animation: "fadeUp 0.8s 0.5s forwards",
            }}
          >
            {personal.tagline}
          </h2>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              maxWidth: "580px",
              marginBottom: "2.5rem",
              opacity: 0,
              animation: "fadeUp 0.8s 0.65s forwards",
            }}
          >
            {personal.description}
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              opacity: 0,
              animation: "fadeUp 0.8s 0.8s forwards",
            }}
          >
            <a
              href={hero.secondaryCta.href}
              target={
                hero.secondaryCta.href.startsWith("http") ? "_blank" : undefined
              }
              rel={
                hero.secondaryCta.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              style={{
                padding: "0.85rem 2rem",
                borderRadius: "8px",
                border: "1px solid rgba(99,102,241,0.35)",
                color: "var(--text-primary)",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--indigo)";
                el.style.background = "rgba(99,102,241,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(99,102,241,0.35)";
                el.style.background = "transparent";
              }}
            >
              {hero.secondaryCta.label}
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const lenis = (window as unknown as Record<string, unknown>)
                  .__lenis as
                  | {
                      scrollTo: (
                        target: Element,
                        opts?: Record<string, unknown>,
                      ) => void;
                    }
                  | undefined;
                const el = document.getElementById("contact");
                if (el)
                  lenis
                    ? lenis.scrollTo(el, { offset: -64, duration: 1.4 })
                    : el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                padding: "0.85rem 2rem",
                borderRadius: "8px",
                border: "1px solid rgba(34,211,238,0.35)",
                color: "var(--cyan)",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--cyan)";
                el.style.background = "rgba(34,211,238,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(34,211,238,0.35)";
                el.style.background = "transparent";
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 2,
          opacity: 0,
          animation: "fadeIn 1s 1.5s forwards",
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            color: "var(--text-secondary)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, var(--indigo), transparent)",
            animation: "scrollLine 1.5s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes fadeUp  { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn  { from { opacity:0; } to { opacity:0.7; } }
        @keyframes scrollLine { 0%,100%{opacity:0.2;transform:scaleY(0.5);transform-origin:top;} 50%{opacity:1;transform:scaleY(1);transform-origin:top;} }
      `}</style>
    </section>
  );
}
