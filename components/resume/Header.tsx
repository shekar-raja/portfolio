import React from "react";
import type { ResumeLink } from "@/content/resume";

interface HeaderProps {
  name: string;
  role: string;
  lede: string;
  links: ResumeLink[];
}

export function Header({ name, role, lede, links }: HeaderProps) {
  return (
    <header>
      <h1>{name}</h1>
      <p className="role">{role}</p>
      <p className="lede">{lede}</p>
      <nav className="links" aria-label="Direct links">
        {links.map((link) => {
          const isExternal =
            link.href.startsWith("http") || link.href.startsWith("mailto:");
          return (
            <a
              key={link.href}
              href={link.href}
              rel="noopener noreferrer"
              target={isExternal ? "_blank" : undefined}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
