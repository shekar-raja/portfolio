import React from "react";
import { formatText } from "./formatText";

interface ProseProps {
  content: string;
}

export function Prose({ content }: ProseProps) {
  return <p>{formatText(content)}</p>;
}
