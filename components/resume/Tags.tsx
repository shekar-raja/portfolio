import React from "react";

interface TagsProps {
  tags: string[];
}

export function Tags({ tags }: TagsProps) {
  return (
    <div className="tags" style={{ marginBottom: "24px" }}>
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}
