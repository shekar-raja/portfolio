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
    color: "#f59e0b",
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
    color: "#2dd4bf",
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
    color: "#f59e0b",
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
    color: "#2dd4bf",
    skills: ["Grafana", "Prometheus", "CloudWatch", "Datadog", "OpenTelemetry"],
  },
  {
    category: "Databases",
    icon: "🗄️",
    color: "#f59e0b",
    skills: ["DynamoDB", "PostgreSQL", "MongoDB", "Redis", "Redshift", "MySQL"],
  },
  {
    category: "Languages",
    icon: "💻",
    color: "#2dd4bf",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "Bash", "HCL"],
  },
];
