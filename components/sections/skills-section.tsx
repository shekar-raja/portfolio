"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "@/components/type/section-header";
import { useRegisterTextBlock } from "@/components/particles/use-particles";
import type { SkillGroup } from "@/lib/schemas";

interface SkillsSectionProps {
  groups: SkillGroup[];
}

export function SkillsSection({ groups }: SkillsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  useRegisterTextBlock("skills", ref);

  if (groups.length === 0) return null;

  return (
    <section
      id="skills"
      ref={ref}
      data-section="skills"
      aria-label="Skills"
      className="relative z-10 mx-auto w-full max-w-6xl border-t border-[var(--line)] px-5 py-[clamp(96px,14vh,160px)] sm:px-8"
    >
      <SectionHeader title="Skills" intro="The tools I reach for, grouped by what they do." />
      <div className="grid border-l border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <motion.div
            key={g.group}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-r border-[var(--line)] p-5 sm:p-6"
          >
            <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--mut)]">
              {g.group}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="border border-[var(--line)] px-2.5 py-1 font-mono text-[11px] text-[var(--fg)]/90 transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
