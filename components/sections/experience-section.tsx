"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "@/components/type/section-header";
import { useRegisterTextBlock } from "@/components/particles/use-particles";
import { WorkGlobe, jobKey } from "@/components/sections/work-globe";
import type { Education, Experience } from "@/lib/schemas";

interface ExperienceSectionProps {
  items: Experience[];
  education?: Education[];
}

export function ExperienceSection({ items, education = [] }: ExperienceSectionProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  useRegisterTextBlock("experience", ref);

  if (items.length === 0) return null;

  return (
    <section
      id="experience"
      ref={ref}
      data-section="experience"
      aria-label="Experience"
      className="relative z-10 mx-auto w-full max-w-6xl border-t border-[var(--line)] px-5 py-[clamp(96px,14vh,160px)] sm:px-8"
    >
      <SectionHeader
        title="Experience"
        intro="Cloud data platforms, industrial telemetry and full-stack systems, most recent first."
      />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-12">
      <div className="order-first self-start lg:sticky lg:top-24 lg:order-last">
        <WorkGlobe jobs={items} education={education} activeKey={activeKey} />
      </div>
      <ol className="min-w-0 divide-y divide-[var(--line)] border-b border-[var(--line)]">
        {items.map((job, i) => (
          <motion.li
            key={`${job.company}-${job.start}`}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: Math.min(i, 3) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            tabIndex={job.geo ? 0 : undefined}
            onPointerEnter={() => setActiveKey(jobKey(job))}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setActiveKey(null);
            }}
            onFocus={() => setActiveKey(jobKey(job))}
            onBlur={() => setActiveKey(null)}
            className="grid gap-4 px-1 py-8 outline-none focus-visible:ring-1 focus-visible:ring-[var(--mut)] sm:px-2 md:grid-cols-[minmax(0,160px)_minmax(0,1fr)] md:gap-8"
          >
            <div className="flex flex-col gap-1.5 font-mono text-[11px] text-[var(--mut)]">
              <time>
                {job.start} – {job.current ? "Present" : job.end}
              </time>
              {job.location && <span>{job.location}</span>}
              {job.current && (
                <span className="inline-flex w-fit items-center gap-1.5 border border-[var(--line)] px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-[var(--fg)]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--fg)]" />
                  current
                </span>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="text-xl font-normal leading-snug tracking-[-0.025em] text-[var(--fg)] sm:text-2xl">
                {job.role}
                <span className="text-[var(--mut)]"> · {job.company}</span>
              </h3>
              <ul className="mt-4 space-y-2.5">
                {job.bullets.map((b) => (
                  <li
                    key={b}
                    className="relative pl-5 text-[14px] font-normal leading-relaxed text-[var(--fg)]/80 sm:text-[15px]"
                  >
                    <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-3 bg-[var(--mut)]" />
                    {b}
                  </li>
                ))}
              </ul>
              {job.tags.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {job.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded bg-[var(--line)]/40 px-2 py-0.5 font-mono text-[10px] text-[var(--fg)]/85"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
      </div>
    </section>
  );
}
