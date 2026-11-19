import React from "react";

/**
 * Tiny safe parser that handles:
 * - **bold** -> <b>bold</b>
 * - `code` -> <code>code</code>
 * - [label](url) -> <a href="url" rel="noopener noreferrer">label</a>
 * Escapes everything else safely via standard React string interpolation.
 */
export function formatText(text: string): React.ReactNode[] {
  const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const href = match[2];
        const isExternal = href.startsWith("http") || href.startsWith("mailto:");
        return (
          <a
            key={index}
            href={href}
            rel="noopener noreferrer"
            target={isExternal ? "_blank" : undefined}
          >
            {formatText(match[1])}
          </a>
        );
      }
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <b key={index}>{part.slice(2, -2)}</b>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}
