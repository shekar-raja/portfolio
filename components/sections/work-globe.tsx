"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import createGlobe, { type Arc, type Globe, type Marker } from "cobe";
import { useTheme } from "next-themes";
import { Briefcase, GraduationCap, House } from "lucide-react";
import type { Education, Experience, Geo } from "@/lib/schemas";

type RGB = [number, number, number];

interface WorkGlobeProps {
  jobs: Experience[];
  education?: Education[];
  /** `${company}-${start}` of the hovered/focused job, or null. */
  activeKey: string | null;
}

export const jobKey = (job: Experience) => `${job.company}-${job.start}`;

const DEG = Math.PI / 180;
const DEFAULT_THETA = 0.25;
const AUTO_SPEED = 0.12; // rad/s
const placeId = (g: Geo) => `${g.lat.toFixed(2)},${g.lng.toFixed(2)}`;

interface Place {
  id: string;
  geo: Geo;
  entries: Set<string>;
  /** Companies / institutions tied to this place, in data order (deduped). */
  orgs: string[];
  current: boolean;
  work: boolean;
  study: boolean;
  home: boolean;
}

type PinKind = "work" | "study" | "home";
const pinKind = (p: Place): PinKind => (p.home ? "home" : p.work ? "work" : "study");

/** Unit-sphere position for a lat/lng, identical to cobe's internal conversion. */
function unitVec(lat: number, lng: number): [number, number, number] {
  const r = lat * DEG;
  const a = lng * DEG - Math.PI;
  const o = Math.cos(r);
  return [-o * Math.cos(a), Math.sin(r), o * Math.sin(a)];
}

// cobe: globe radius 0.8 (NDC, box = 2), markers sit at +0.05 elevation, scale 1.
const MARKER_R = 0.85;
/** Pins fade over this range of view-direction dot product around the limb. */
const FADE_START = 0.02;
const FADE_END = 0.3;

/** cobe orientation that centres a lat/lng (phi=0 faces lng -90). */
function focusAngles(lat: number, lng: number) {
  return { phi: Math.PI - (lng * DEG - Math.PI / 2), theta: lat * DEG };
}

const PALETTE = {
  dark: {
    dark: 1,
    mapBrightness: 6,
    baseColor: [0.32, 0.32, 0.32] as RGB,
    glowColor: [0.1, 0.1, 0.1] as RGB,
    markerColor: [0.85, 0.85, 0.85] as RGB,
    arcColor: [0.55, 0.55, 0.55] as RGB,
    hi: [1, 1, 1] as RGB,
  },
  light: {
    dark: 0,
    mapBrightness: 2,
    baseColor: [0.95, 0.95, 0.94] as RGB,
    glowColor: [0.9, 0.9, 0.89] as RGB,
    markerColor: [0.2, 0.2, 0.2] as RGB,
    arcColor: [0.5, 0.5, 0.5] as RGB,
    hi: [0, 0, 0] as RGB,
  },
};

export function WorkGlobe({ jobs, education = [], activeKey }: WorkGlobeProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const palette = isDark ? PALETTE.dark : PALETTE.light;

  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<Globe | null>(null);
  const [near, setNear] = useState(false);

  // ---- Derivation: everything below comes purely from the data. ----
  // To show Lifebridge, just add an experience entry with
  // geo = Boston and remoteFrom = Hatfield; the marker and arc appear here
  // automatically (no globe code changes needed).
  const { places, arcSpecs } = useMemo(() => {
    const map = new Map<string, Place>();
    const add = (g: Geo | undefined, entry: string, kind: PinKind, org: string, current = false) => {
      if (!g) return;
      const id = placeId(g);
      const p =
        map.get(id) ??
        { id, geo: g, entries: new Set<string>(), orgs: [], current: false, work: false, study: false, home: false };
      p.entries.add(entry);
      if (!p.orgs.includes(org)) p.orgs.push(org);
      p.current = p.current || current;
      p[kind] = true;
      map.set(id, p);
    };
    jobs.forEach((j) => {
      add(j.geo, `job:${jobKey(j)}`, "work", j.company, !!j.current);
      add(j.remoteFrom, `job:${jobKey(j)}`, "home", `${j.company} (remote)`);
    });
    education.forEach((e) => add(e.geo, `edu:${e.degree}`, "study", e.institution));
    const arcSpecs = jobs
      .filter((j) => j.geo && j.remoteFrom)
      .map((j) => ({ key: jobKey(j), from: j.remoteFrom as Geo, to: j.geo as Geo }));
    return { places: [...map.values()], arcSpecs };
  }, [jobs, education]);

  const pinVecs = useMemo(() => places.map((p) => unitVec(p.geo.lat, p.geo.lng)), [places]);
  const pinsRef = useRef<HTMLDivElement>(null);
  const pinVecsRef = useRef(pinVecs);

  const activeJob = useMemo(() => jobs.find((j) => jobKey(j) === activeKey) ?? null, [jobs, activeKey]);

  const view = useMemo(() => {
    const activeIds = new Set<string>();
    if (activeJob?.geo) activeIds.add(placeId(activeJob.geo));
    const markers: Marker[] = places.map((p) => {
      const big = p.current || p.entries.size > 1;
      const active = activeIds.has(p.id);
      return {
        location: [p.geo.lat, p.geo.lng],
        size: (big ? 0.07 : 0.045) * (active ? 1.35 : 1),
        ...(active ? { color: palette.hi } : {}),
      };
    });
    const arcs: Arc[] = arcSpecs.map((a) => ({
      from: [a.from.lat, a.from.lng],
      to: [a.to.lat, a.to.lng],
      ...(a.key === activeKey ? { color: palette.hi } : {}),
    }));
    return { markers, arcs };
  }, [places, arcSpecs, activeJob, activeKey, palette]);

  // Animation / interaction state, mutated from rAF + pointer handlers.
  const st = useRef({
    phi: 3.6,
    theta: DEFAULT_THETA,
    vel: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    target: null as { phi: number; theta: number } | null,
    inView: false,
    reduced: false,
    size: 0,
  });
  const viewRef = useRef(view);

  /** Project every pin with cobe's own maths and write transform/opacity straight to the DOM. */
  const layoutPins = useRef(() => {});
  const layoutImpl = () => {
    const layer = pinsRef.current;
    const s = st.current;
    if (!layer || !s.size) return;
    const vecs = pinVecsRef.current;
    const cT = Math.cos(s.theta);
    const sT = Math.sin(s.theta);
    const cP = Math.cos(s.phi);
    const sP = Math.sin(s.phi);
    const kids = layer.children;
    for (let i = 0; i < kids.length && i < vecs.length; i++) {
      const el = kids[i] as HTMLElement;
      const [vx, vy, vz] = vecs[i];
      const x = MARKER_R * vx;
      const y = MARKER_R * vy;
      const z = MARKER_R * vz;
      const c = cP * x + sP * z;
      const sy = sP * sT * x + cT * y - cP * sT * z;
      const depth = (-sP * cT * x + sT * y + cP * cT * z) / MARKER_R; // 1 = facing us
      const px = ((c + 1) / 2) * s.size;
      const py = ((-sy + 1) / 2) * s.size;
      const t = Math.min(1, Math.max(0, (depth - FADE_START) / (FADE_END - FADE_START)));
      el.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0)`;
      el.style.opacity = t.toFixed(3);
      el.style.filter = t < 1 ? `blur(${((1 - t) * 4).toFixed(2)}px)` : "none";
      el.style.pointerEvents = t > 0.6 ? "auto" : "none";
      el.dataset.side = px > s.size * 0.55 ? "left" : "right";
    }
  };

  useEffect(() => {
    layoutPins.current = layoutImpl;
  });

  useEffect(() => {
    pinVecsRef.current = pinVecs;
    layoutPins.current();
  }, [pinVecs]);

  useEffect(() => {
    viewRef.current = view;
    globeRef.current?.update({ markers: view.markers, arcs: view.arcs });
  }, [view]);

  // Rotate to the active job (smoothly, or instantly under reduced motion).
  useEffect(() => {
    const s = st.current;
    const g = activeJob?.geo;
    if (!g) {
      s.target = null;
      return;
    }
    let lat = g.lat;
    let lng = g.lng;
    const from = activeJob?.remoteFrom;
    if (from) {
      lat = (lat + from.lat) / 2;
      lng = (lng + from.lng) / 2; // centre the arc rather than one end
    }
    const t = focusAngles(lat, lng);
    s.target = t;
    s.vel = 0;
    if (s.reduced) {
      s.phi = t.phi;
      s.theta = t.theta;
    }
  }, [activeJob]);

  // Near-viewport detection (lazy create) + on-screen tracking (pause loop).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      st.current.inView = true;
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[entries.length - 1];
        st.current.inView = e.isIntersecting;
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Create / destroy the globe (recreated when the theme changes).
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!near || !canvas || !wrap) return;
    const s = st.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    s.reduced = mq.matches;
    const onMq = () => {
      s.reduced = mq.matches;
    };
    mq.addEventListener("change", onMq);

    const size = Math.max(1, Math.round(wrap.clientWidth));
    s.size = size;
    layoutPins.current();
    const globe = createGlobe(canvas, {
      width: size,
      height: size,
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      phi: s.phi,
      theta: s.theta,
      dark: palette.dark,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: palette.mapBrightness,
      baseColor: palette.baseColor,
      markerColor: palette.markerColor,
      glowColor: palette.glowColor,
      markers: viewRef.current.markers,
      arcs: viewRef.current.arcs,
      arcColor: palette.arcColor,
      arcWidth: 0.5,
      arcHeight: 0.25,
    });
    globeRef.current = globe;

    const ro = new ResizeObserver(([entry]) => {
      const w = Math.max(1, Math.round(entry.contentRect.width));
      if (w === s.size) return;
      s.size = w;
      globe.update({ width: w, height: w });
      layoutPins.current();
    });
    ro.observe(wrap);

    let raf = 0;
    let last = performance.now();
    let lastPhi = NaN;
    let lastTheta = NaN;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!s.inView || document.hidden) return;

      if (!s.dragging) {
        if (s.target) {
          const k = 1 - Math.exp(-dt * 4);
          let d = (s.target.phi - s.phi) % (2 * Math.PI);
          if (d > Math.PI) d -= 2 * Math.PI;
          if (d < -Math.PI) d += 2 * Math.PI;
          s.phi += d * k;
          s.theta += (s.target.theta - s.theta) * k;
        } else {
          s.phi += s.vel;
          s.vel *= Math.exp(-dt * 3);
          if (!s.reduced) s.phi += AUTO_SPEED * dt;
          if (!s.reduced) s.theta += (DEFAULT_THETA - s.theta) * (1 - Math.exp(-dt * 1.5));
        }
      }
      if (s.phi !== lastPhi || s.theta !== lastTheta) {
        lastPhi = s.phi;
        lastTheta = s.theta;
        globe.update({ phi: s.phi, theta: s.theta });
        layoutPins.current();
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mq.removeEventListener("change", onMq);
      globe.destroy();
      globeRef.current = null;
    };
  }, [near, palette]);

  const onPointerDown = (e: React.PointerEvent) => {
    const s = st.current;
    s.dragging = true;
    s.target = null;
    s.vel = 0;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = st.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    const k = 0.006;
    s.phi += dx * k;
    s.vel = dx * k * 0.5;
    s.theta = Math.max(-1.1, Math.min(1.1, s.theta + dy * k));
  };
  const endDrag = () => {
    st.current.dragging = false;
  };

  const placeLabels = places.map((p) => p.geo.label);
  const ariaLabel = `Interactive globe showing places I have worked and studied: ${placeLabels.join(", ")}.`;

  return (
    <div ref={wrapRef} data-work-globe className="mx-auto w-full max-w-[420px]">
      <div
        role="img"
        aria-label={ariaLabel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative aspect-square w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ aspectRatio: "1 / 1", contain: "layout paint size" }}
        />
        <div ref={pinsRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
          {places.map((p) => {
            const kind = pinKind(p);
            const Icon = kind === "home" ? House : kind === "work" ? Briefcase : GraduationCap;
            const active = !!activeKey && p.entries.has(`job:${activeKey}`);
            return (
              <div key={p.id} className="absolute left-0 top-0 will-change-transform" style={{ opacity: 0 }}>
                <div
                  data-active={active || undefined}
                  className="group relative -ml-[11px] -mt-[11px] flex h-[22px] w-[22px] items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg)] text-[var(--mut)] shadow-sm transition-[transform,color,border-color] duration-200 hover:scale-110 hover:text-[var(--fg)] data-[active]:scale-125 data-[active]:border-[var(--p0)] data-[active]:text-[var(--p0)]"
                >
                  {p.current && (
                    <span className="pointer-events-none absolute inset-0 rounded-full border border-[var(--p0)] motion-safe:animate-ping" />
                  )}
                  <Icon size={13} strokeWidth={1.75} className="relative" />
                  <span
                    className={`pointer-events-none absolute top-1/2 z-10 flex -translate-y-1/2 flex-col gap-0.5 whitespace-nowrap rounded-md border border-[var(--line)] bg-[var(--bg)] px-2 py-1 font-mono text-[10px] leading-tight text-[var(--fg)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-data-[active]:opacity-100 ${
                      "[[data-side=left]_&]:right-full [[data-side=left]_&]:mr-1.5 [[data-side=left]_&]:items-end [[data-side=right]_&]:left-full [[data-side=right]_&]:ml-1.5"
                    }`}
                  >
                    {p.orgs.map((o) => (
                      <span key={o}>{o}</span>
                    ))}
                    <span className="text-[9px] text-[var(--mut)]">{p.geo.label}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ul className="sr-only" aria-label="Places">
        {places.map((p) => (
          <li key={p.id}>
            {p.geo.label}: {p.orgs.join(", ")}
          </li>
        ))}
      </ul>
      {arcSpecs.length > 0 && (
        <p className="mt-3 text-center font-mono text-[10px] text-[var(--mut)]" aria-hidden="true">
          arcs: remote work, from where it was done to where it shipped
        </p>
      )}
    </div>
  );
}
