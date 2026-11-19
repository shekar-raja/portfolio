import React from "react";
import type { ResumeLaunch } from "@/content/resume";

interface LaunchListProps {
  launches: ResumeLaunch[];
}

export function LaunchList({ launches }: LaunchListProps) {
  return (
    <div className="job" style={{ margin: 0 }}>
      {launches.map((launch) => (
        <div key={launch.href} className="head launchHead">
          <a
            href={launch.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {launch.label}
          </a>
          <span className="when">{launch.date}</span>
        </div>
      ))}
    </div>
  );
}
