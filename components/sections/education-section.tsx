"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "@/components/type/section-header";
import { useRegisterTextBlock } from "@/components/particles/use-particles";
import type { Education } from "@/lib/schemas";

interface EducationSectionProps {
  items: Education[];
}

export function EducationSection({ items }: EducationSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  useRegisterTextBlock("education", ref);

  if (items.length === 0) return null;

  return (
    <section
      id="education"
      ref={ref}
      data-section="education"
      aria-label="Education"
      className="relative z-10 mx-auto w-full max-w-6xl border-t border-[var(--line)] px-5 py-[clamp(96px,14vh,160px)] sm:px-8"
    >
      <SectionHeader title="Education" intro="Where the foundations came from." />
      <ul className="divide-y divide-[var(--line)] border-b border-[var(--line)]">
        {items.map((e, i) => (
          <motion.li
            key={`${e.institution}-${e.degree}`}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-3 px-1 py-7 sm:px-2 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:gap-10"
          >
            <div className="flex flex-col gap-1.5 font-mono text-[11px] text-[var(--mut)]">
              <time>
                {e.start}
                {e.end ? ` – ${e.end}` : ""}
              </time>
              {e.location && <span>{e.location}</span>}
            </div>
            <div className="min-w-0">
              <h3 className="text-xl font-normal leading-snug tracking-[-0.025em] text-[var(--fg)] sm:text-2xl">
                {e.degree}
              </h3>
              <p className="mt-1 font-mono text-xs text-[var(--mut)]">{e.institution}</p>
              {e.detail && (
                <p className="mt-3 max-w-2xl text-[14px] font-normal leading-relaxed text-[var(--fg)]/80 sm:text-[15px]">
                  {e.detail}
                </p>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
