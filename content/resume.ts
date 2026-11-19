export type ResumeLink = {
  label: string;
  href: string;
};

export type ResumeEntry = {
  title: string;
  titleHref?: string;
  meta?: string;
  metaHref?: string;
  org?: string;
  blurb?: string;
  bullets: string[];
};

export type ResumeLaunch = {
  label: string;
  href: string;
  date: string;
};

export type ResumeSkill = {
  label: string;
  value: string;
};

export interface ResumeData {
  name: string;
  role: string;
  lede: string;
  links: ResumeLink[];
  about: string[];
  snapshot: string[];
  experience: ResumeEntry[];
  projects: ResumeEntry[];
  launches: {
    intro: string;
    items: ResumeLaunch[];
  };
  community: {
    intro: string;
    bullets: string[];
  };
  skills: ResumeSkill[];
  education: ResumeEntry;
  contact: {
    intro: string;
    roles: string[];
    links: ResumeLink[];
  };
  footer: {
    hint: string;
  };
}

export const resume: ResumeData = {
  name: "Raja Shekar",
  role: "Cloud Data Engineer",
  lede: "I build data platforms, pipelines and AI solutions, and I'm curious about how things work.",
  links: [
    { label: "email", href: "mailto:rshekar.contact@gmail.com" },
    { label: "linkedin / raja-shekar", href: "https://www.linkedin.com/in/raja-shekar/" },
    { label: "github", href: "https://github.com/shekar-raja" },
    { label: "rshekar.me", href: "https://rshekar.me" },
  ],
  about: [
    "I've always been curious about how things work. That curiosity first led me into building full stack web applications and, over time, into data, cloud engineering, and applied AI.",
    "With **over five years of experience as a software engineer**, I now focus on designing and delivering data driven systems that turn ideas into real world solutions, from improving operational efficiency to supporting sustainability goals.",
    "I'm currently a Cloud Data Engineer at **Koolmill Systems**, contributing to an Innovate UK funded project developing next generation smart systems for rice milling.",
  ],
  snapshot: [
    "5+ years as a software engineer",
    "Cloud Data Engineer at Koolmill Systems",
    "MSc Data Science and Analytics",
    "Published Adobe XD plugin with 500+ installs",
  ],
  experience: [
    {
      title: "Koolmill Systems · Cloud Data Engineer",
      meta: "Jun 2025 – Present",
      org: "Sheffield, UK · Innovate UK funded Digital Rice Mill Demonstrator",
      blurb:
        "A scalable cloud data platform for real-time monitoring of industrial rice milling machines.",
      bullets: [
        "Architected the end-to-end data architecture to ingest and process second-level industrial time-series telemetry from PLC-controlled milling systems via edge devices.",
        "**Cut large-range query latency from 25–35s to sub-second** with a multi-tenant time-series data model.",
        "Led a **zero-downtime production data migration** (14-hour rollout) with validation checks, reducing database RCU/WCU consumption and operational costs.",
        "Built real-time telemetry ingestion pipelines on the AWS IoT platform alongside batch ETL workflows for daily and monthly operational analytics.",
        "Implemented CI/CD and infrastructure automation with GitHub Actions, Docker, ECR, ECS and Terraform across multi-environment deployments.",
        "Designed a secure API layer using IAM, ABAC policies and Cognito, enabling tenant-level access control to machine telemetry.",
      ],
    },
    {
      title: "TruNums · Software Engineer",
      meta: "Oct 2022 – Jan 2024",
      org: "Remote, US",
      bullets: [
        "Developed and deployed a MEAN-stack social media platform serving **5,000+ global users**, delivering scalable user interactions and real-time content features.",
        "Designed scalable MongoDB and Redis data models improving application performance and session handling.",
        "Deployed production releases via AWS, reducing downtime and ensuring stable global updates.",
      ],
    },
    {
      title: "Groundhog Apps · Software Engineer",
      meta: "Dec 2019 – Aug 2022",
      org: "Hyderabad, India",
      bullets: [
        "Developed and maintained MEAN-stack applications for mining operations, contributing to a **40% increase in production throughput per shift**.",
        "Automated shift-end reporting workflows, reducing manual reporting effort by 50%.",
        "Optimised database indexing strategies, reducing query latency by 20%.",
        "Designed and maintained REST APIs supporting operational analytics and reporting dashboards.",
      ],
    },
  ],
  projects: [
    {
      title: "Exoplanet Detection ML",
      titleHref: "https://github.com/shekar-raja/exoplanet-detection-system-ml",
      meta: "MSc thesis",
      org: "Classifying planetary transit signals from the NASA Kepler dataset.",
      bullets: [
        "Developed and evaluated an MLP model, applying feature engineering, model tuning, and cross-validation.",
        "Built with Python, PyTorch, Pandas and Scikit-Learn.",
      ],
    },
    {
      title: "AlertOps AI",
      titleHref: "https://github.com/shekar-raja/alertops-ai",
      meta: "DevOps log classification",
      org: "Automatically prioritising operational alerts (P1–P4).",
      bullets: [
        "Real-time log classification using NLP and supervised learning (Random Forest, XGBoost, LSTM), reducing manual triaging and accelerating incident resolution.",
        "Built with Python, Kafka, PyTorch, Scikit-Learn, FastAPI and Azure.",
      ],
    },
    {
      title: "AG Grid Dash",
      meta: "semantic search dashboard",
      org: "Hybrid semantic search and recommendations over a data grid.",
      bullets: [
        "Records are embedded into dense vectors via a FastAPI microservice and indexed in FAISS; keyword filtering and nearest-neighbour search run in parallel and are fused by score.",
        "The same embedding pipeline powers a recommendation system based on vector proximity.",
      ],
    },
    {
      title: "Adobe XD Layout Plugin",
      titleHref: "https://github.com/shekar-raja/Image-Optimizer-AdobeXD",
      meta: "500+ installs",
      org: "Accessible responsive grid layouts from a component selection.",
      bullets: [
        "A published Adobe XD plugin that auto-generates accessible responsive grid layouts.",
      ],
    },
    {
      title: "rshekar.me",
      titleHref: "https://github.com/shekar-raja/portfolio",
      meta: "this portfolio",
      org: "My corner of the internet.",
      bullets: ["Next.js, Tailwind CSS and a Verlet-physics lanyard."],
    },
  ],
  launches: {
    intro: "",
    items: [],
  },
  community: {
    intro: "",
    bullets: [],
  },
  skills: [
    { label: "Languages & backend", value: "Python, SQL, JavaScript, Scala, FastAPI, Node.js, React, Angular" },
    {
      label: "Cloud & AWS",
      value: "S3, Lambda, ECS, IoT Core, API Gateway, Cognito, CloudWatch, SNS, DynamoDB, IAM, SageMaker, ECR",
    },
    { label: "DevOps & IaC", value: "Terraform, Docker, GitHub Actions, IAM, ABAC" },
    { label: "Databases", value: "DynamoDB, PostgreSQL, MongoDB, Redis, CouchDB" },
    {
      label: "Data engineering",
      value: "ETL/ELT pipelines, real-time streaming, time-series modelling, data modelling, query optimisation",
    },
    { label: "ML & data science", value: "PyTorch, Scikit-Learn, Pandas, NumPy, Matplotlib" },
  ],
  education: {
    title: "University of Hertfordshire",
    meta: "Sep 2022 – Nov 2024",
    org: "MSc Data Science and Analytics · Hatfield, UK",
    blurb:
      "Machine learning, cloud computing and data analytics. Dissertation on exoplanet detection using machine learning with the NASA Kepler dataset.",
    bullets: [
      "BSc Computer Science, Hyderabad Institute of Technology and Management (Jun 2015 – Aug 2019).",
    ],
  },
  contact: {
    intro: "Drop me a message to ask a question, offer an opportunity or just say hi:",
    roles: [],
    links: [
      { label: "rshekar.contact@gmail.com", href: "mailto:rshekar.contact@gmail.com" },
      { label: "linkedin.com/in/raja-shekar", href: "https://www.linkedin.com/in/raja-shekar/" },
      { label: "github.com/shekar-raja", href: "https://github.com/shekar-raja" },
    ],
  },
  footer: {
    hint: "Hit “Rebuild this page” (bottom right) or press Alt+Shift+S.",
  },
};
