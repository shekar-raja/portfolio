export interface SkillGroup {
  category: string;
  icon: string;
  color: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Cloud & Platform",
    icon: "☁️",
    color: "#6366f1",
    skills: [
      "AWS Lambda",
      "DynamoDB",
      "S3",
      "Kinesis",
      "IoT Core",
      "API Gateway",
      "Cognito",
      "CloudWatch",
    ],
  },
  {
    category: "DevOps & IaC",
    icon: "⚙️",
    color: "#22d3ee",
    skills: [
      "Terraform",
      "GitHub Actions",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "ArgoCD",
    ],
  },
  {
    category: "Data & ML",
    icon: "🧠",
    color: "#6366f1",
    skills: [
      "PySpark",
      "AWS Glue",
      "Redshift",
      "SageMaker",
      "TensorFlow",
      "LangChain",
      "Pinecone",
    ],
  },
  {
    category: "Observability",
    icon: "📊",
    color: "#22d3ee",
    skills: ["Grafana", "Prometheus", "CloudWatch", "Datadog", "OpenTelemetry"],
  },
  {
    category: "Databases",
    icon: "🗄️",
    color: "#6366f1",
    skills: ["DynamoDB", "PostgreSQL", "MongoDB", "Redis", "Redshift", "MySQL"],
  },
  {
    category: "Languages",
    icon: "💻",
    color: "#22d3ee",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "Bash", "HCL"],
  },
];
