import React from "react";
import { formatText } from "./formatText";

interface SnapshotProps {
  items: string[];
}

export function Snapshot({ items }: SnapshotProps) {
  return (
    <div className="snap">
      <div>Snapshot</div>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{formatText(item)}</li>
        ))}
      </ul>
    </div>
  );
}
