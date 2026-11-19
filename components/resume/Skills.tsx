import React from "react";
import type { ResumeSkill } from "@/content/resume";

interface SkillsProps {
  skills: ResumeSkill[];
}

export function Skills({ skills }: SkillsProps) {
  return (
    <dl className="skills">
      {skills.map((skill) => (
        <React.Fragment key={skill.label}>
          <dt>{skill.label}</dt>
          <dd>{skill.value}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
