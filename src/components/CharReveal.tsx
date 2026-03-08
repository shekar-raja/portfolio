"use client";
import React, { useEffect, useRef } from "react";

interface Props {
  text: string;
  tag?: "h1" | "h2" | "h3";
  style?: React.CSSProperties;
  className?: string;
}

export default function CharReveal({
  text,
  tag: Tag = "h2",
  style,
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("char-revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const chars = text.split("").map((char, i) => (
    <span key={i} className="char" style={{ transitionDelay: `${i * 0.03}s` }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <Tag
      ref={ref as React.Ref<HTMLHeadingElement>}
      className={`char-wrap${className ? ` ${className}` : ""}`}
      style={style}
    >
      {chars}
    </Tag>
  );
}
