export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Cloud Data Engineer",
    company: "Koolmill Systems",
    period: "Apr 2025 – Present",
    location: "Remote, UK",
    bullets: [
      "Redesigned DynamoDB schema with single-table design, cutting storage costs by 50% and eliminating cross-table joins.",
      "Led a 14-hour zero-downtime migration of 2M+ IoT records from legacy MySQL to DynamoDB using Lambda fan-out and SQS FIFO.",
      "Provisioned entire cloud infrastructure (API Gateway, Lambda, DynamoDB, IoT Core) with Terraform; reduced deployment drift to zero.",
      "Replaced manual deployments with GitHub Actions CI/CD pipelines, cutting release cycle from days to under 30 minutes.",
      "Implemented ABAC on AWS IoT Core with Cognito identity pools, locking device data to authenticated tenant scopes.",
      "Architected an IoT ingestion pipeline handling 10,000+ concurrent device streams with Lambda concurrency reservations and DLQ alerting.",
    ],
    tags: [
      "AWS",
      "DynamoDB",
      "Terraform",
      "IoT Core",
      "Lambda",
      "GitHub Actions",
    ],
  },
  {
    role: "Data Engineer",
    company: "TruNums",
    period: "Oct 2022 – Jan 2024",
    location: "Remote",
    bullets: [
      "Built ETL pipelines processing 5M+ financial records daily using PySpark and AWS Glue.",
      "Designed star-schema data warehouse on Redshift, reducing query latency by 40% for business intelligence workloads.",
      "Automated anomaly detection workflows with SageMaker, flagging data quality issues before downstream consumption.",
    ],
    tags: ["PySpark", "AWS Glue", "Redshift", "SageMaker", "ETL"],
  },
  {
    role: "Software Engineer – Backend & Data",
    company: "Groundhog Apps",
    period: "Dec 2019 – Aug 2022",
    location: "Hyderabad, India",
    bullets: [
      "Developed RESTful microservices with Node.js and Express, serving 50k+ active users.",
      "Built real-time event streaming pipeline using Kafka and MongoDB, replacing batch jobs with sub-second latency feeds.",
      "Containerised services with Docker and orchestrated deployments on Kubernetes, achieving 99.9% uptime over 18 months.",
      "Created internal analytics dashboards with Python (Pandas, Matplotlib) for product and growth teams.",
    ],
    tags: ["Node.js", "Kafka", "MongoDB", "Docker", "Kubernetes", "Python"],
  },
];
