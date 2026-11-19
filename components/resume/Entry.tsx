import React from "react";
import type { ResumeEntry } from "@/content/resume";
import { formatText } from "./formatText";

interface EntryProps {
  entry: ResumeEntry;
}

export function Entry({ entry }: EntryProps) {
  const { title, titleHref, meta, org, blurb, bullets } = entry;
  const isTitleExternal = titleHref && titleHref.startsWith("http");

  return (
    <div className="job">
      <div className="head">
        <h3>
          {titleHref ? (
            <a
              href={titleHref}
              rel="noopener noreferrer"
              target={isTitleExternal ? "_blank" : undefined}
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        {meta && <span className="when">{formatText(meta)}</span>}
      </div>
      {org && <p className="org">{formatText(org)}</p>}
      {blurb && <p>{formatText(blurb)}</p>}
      {bullets && bullets.length > 0 && (
        <ul className="bullets">
          {bullets.map((bullet, idx) => (
            <li key={idx}>{formatText(bullet)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
