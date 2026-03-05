import type { IconType } from "react-icons";
import * as SiIcons from "react-icons/si";

/**
 * Manual aliases for skill names that don't directly map to their
 * Simple Icons slug via lowercase + strip-non-alphanumeric.
 *
 * Key   = exact skill name as used in portfolio.config.ts
 * Value = Simple Icons slug (lowercase, no spaces/punctuation)
 *
 * Every skill NOT listed here is auto-resolved:
 *   e.g.  "Docker"     → "docker"     → "SiDocker"    ✓
 *         "PostgreSQL" → "postgresql" → "SiPostgresql" ✓
 *         "Rust"       → "rust"       → "SiRust"       ✓  (zero config needed)
 */
const SKILL_ALIASES: Record<string, string> = {
  // DevOps / IaC
  "GitHub Actions": "githubactions",
  ArgoCD: "argo",
  Bash: "gnubash",
  HCL: "hashicorp",
  PySpark: "apachespark",

  // AWS — services with dedicated Simple Icons
  S3: "amazons3",
  DynamoDB: "amazondynamodb",
  "AWS Lambda": "awslambda",
  Redshift: "amazonredshift",
  SageMaker: "amazonsagemaker",

  // AWS — services without dedicated icons → generic Amazon icon
  Kinesis: "amazonaws",
  "IoT Core": "amazonaws",
  "API Gateway": "amazonaws",
  Cognito: "amazonaws",
  CloudWatch: "amazonaws",
  "AWS Glue": "amazonaws",

  // Telemetry
  OpenTelemetry: "opentelemetry",

  // Tools without a Simple Icons entry → explicitly null so we skip cleanly
  LangChain: "",
  Pinecone: "",
  SQL: "",
};

/**
 * Official Simple Icons brand hex colours, keyed by slug.
 * Used by getSkillMeta to colourise each icon.
 *
 * Colors with poor contrast on dark backgrounds are replaced with
 * a visible alternative (noted inline).
 *
 * New skills auto-resolved via name normalisation will pick up their
 * colour here automatically if their slug is listed.
 */
const BRAND_COLORS: Record<string, string> = {
  // AWS
  amazonaws: "#FF9900",
  amazons3: "#569A31",
  amazondynamodb: "#4053D6",
  awslambda: "#FF9900",
  amazonredshift: "#8C4FFF",
  amazonsagemaker: "#FF9900",

  // DevOps / IaC
  terraform: "#844FBA",
  githubactions: "#2088FF",
  docker: "#2496ED",
  kubernetes: "#326CE5",
  jenkins: "#D24939",
  argo: "#EF7B4D",
  hashicorp: "#844FBA", // official #000000 → use Terraform purple instead

  // Data / ML
  apachespark: "#E25A1C",
  tensorflow: "#FF6F00",

  // Observability
  grafana: "#F46800",
  prometheus: "#E6522C",
  datadog: "#632CA6",
  opentelemetry: "#425CC7", // official #000000 → use their blue instead

  // Databases
  postgresql: "#4169E1",
  mongodb: "#47A248",
  redis: "#FF4438",
  mysql: "#4479A1",

  // Languages
  python: "#3776AB",
  typescript: "#3178C6",
  javascript: "#F7DF1E",
  gnubash: "#4EAA25",
};

export interface SkillMeta {
  icon: IconType | null;
  /** Brand hex colour string (e.g. "#2496ED"), or null to inherit CSS colour. */
  color: string | null;
}

/**
 * Resolves a skill name to its react-icons/si component AND brand colour.
 *
 * Resolution order:
 *  1. Check SKILL_ALIASES — handles non-obvious brand names
 *  2. Auto-normalize: lowercase + strip non-alphanumeric
 *  3. Build key "Si" + capitalised slug and look it up in react-icons/si
 *  4. Look up BRAND_COLORS[slug] for the icon colour
 *
 * Returns { icon: null, color: null } when no matching icon exists
 * (tag renders text-only, unchanged styling).
 *
 * Adding a new skill to config.ts that happens to match its Simple Icons
 * name (e.g. "Rust", "Go", "Kafka") requires zero changes here.
 */
export function getSkillMeta(skillName: string): SkillMeta {
  // 1. Check alias map
  const aliasSlug =
    SKILL_ALIASES[skillName] !== undefined
      ? SKILL_ALIASES[skillName]
      : undefined;

  // Explicit empty string in aliases = intentionally no icon
  if (aliasSlug === "") return { icon: null, color: null };

  // 2. Determine the slug to use
  const slug = aliasSlug ?? skillName.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (!slug) return { icon: null, color: null };

  // 3. Resolve icon component
  const key = "Si" + slug.charAt(0).toUpperCase() + slug.slice(1);
  const iconCandidate = (SiIcons as Record<string, unknown>)[key];
  const icon =
    typeof iconCandidate === "function" ? (iconCandidate as IconType) : null;

  // 4. Resolve brand colour
  const color = BRAND_COLORS[slug] ?? null;

  return { icon, color };
}
