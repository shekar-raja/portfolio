"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/type/section-header";
import { HoloCard } from "@/components/cards/holo-card";
import { useRegisterTextBlock } from "@/components/particles/use-particles";
import type { Testimonial } from "@/lib/schemas";

interface TestimonialsSectionProps {
  items: Testimonial[];
}

export function TestimonialsSection({ items }: TestimonialsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  useRegisterTextBlock("testimonials", ref);

  if (items.length === 0) return null;

  return (
    <section
      id="testimonials"
      ref={ref}
      data-section="testimonials"
      aria-label="Testimonials"
      className="relative z-10 mx-auto w-full max-w-6xl border-t border-[var(--line)] px-5 py-[clamp(96px,14vh,160px)] sm:px-8"
    >
      <SectionHeader
        title="Testimonials"
        intro="Kind words from people I've worked with, via LinkedIn recommendations."
      />
      <div className="grid items-start gap-6 lg:grid-cols-3">
        {items.map((t, i) => (
          <motion.div
            key={t.name}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className={i === 0 ? "lg:col-span-3" : ""}
          >
            <HoloCard
              variant="editorial"
              enableTilt={false}
              roundedClassName="rounded-none"
              className="h-full w-full border border-[var(--line)] bg-[var(--bg)]"
            >
              <figure className="flex h-full flex-col justify-between gap-6 p-6 sm:p-8">
                <blockquote
                  className={`font-normal text-[var(--fg)]/90 ${
                    i === 0
                      ? "max-w-4xl text-[15px] leading-relaxed sm:text-[17px]"
                      : "text-[14px] leading-relaxed sm:text-[15px]"
                  }`}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex flex-wrap items-end justify-between gap-3 border-t border-[var(--line)] pt-4">
                  <div className="min-w-0">
                    <div className="text-[15px] tracking-[-0.015em] text-[var(--fg)]">{t.name}</div>
                    <div className="mt-1 font-mono text-[11px] text-[var(--mut)]">
                      {t.role}
                      {t.relationship ? ` · ${t.relationship}` : ""}
                      {t.date ? ` · ${t.date}` : ""}
                    </div>
                  </div>
                  {t.linkedin && (
                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.name} on LinkedIn (opens in a new tab)`}
                      className="group inline-flex items-center gap-1.5 border border-[var(--line)] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--fg)] transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}
                </figcaption>
              </figure>
            </HoloCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
