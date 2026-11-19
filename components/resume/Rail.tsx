"use client";

import React from "react";

const SECTIONS = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "launches", label: "launches" },
  { id: "community", label: "community" },
  { id: "contact", label: "contact" },
];

export function Rail() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      if (typeof window !== "undefined" && window.history?.pushState) {
        window.history.pushState(null, "", `#${id}`);
      }
    }
  };

  return (
    <nav
      className="rail"
      data-swarm-ignore
      aria-label="Sections"
    >
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={(e) => handleClick(e, section.id)}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
