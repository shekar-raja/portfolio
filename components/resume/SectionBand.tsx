import React from "react";

interface SectionBandProps {
  id?: string;
  title: string;
}

export function SectionBand({ id, title }: SectionBandProps) {
  return (
    <h2 id={id}>
      <span>{title}</span>
    </h2>
  );
}
