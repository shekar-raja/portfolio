import type { PortfolioConfig } from "@/types/portfolio";

// ─────────────────────────────────────────────────────────────────────────────
//  PORTFOLIO CONFIG
//  Edit this file to update every piece of content on the website.
//  Adding a project? Add an entry to `projects[]`.
//  New blog post? Add to `writing[]`.
//  Change your title? Edit `personal.title`.
//  The site reflects changes automatically on next build / hot-reload.
// ─────────────────────────────────────────────────────────────────────────────

const portfolioConfig: PortfolioConfig = {
  // ── Personal details ────────────────────────────────────────────────────────
  // Used in: Nav logo tooltip, Hero, About, Contact, Footer, <title>, OG tags
  personal: {
    name: "Raja Shekar",
    initials: "",
    title: "Cloud Data Engineer",
    tagline: "Building scalable data systems on the cloud.",
    description:
      "Cloud Data Engineer specialising in AWS serverless, IoT pipelines, ML systems and Infrastructure as Code.",
    email: "rshekar.contact@gmail.com",
    linkedin: "https://www.linkedin.com/in/raja-shekar/",
    github: "https://github.com/shekar-raja",
    resume:
      "https://drive.google.com/file/d/1GvuQLTMwQZvWREcrDMe2kdtXRybcVzuw/view?usp=sharing",
    avatar: "/portfolio/images/headshot.png",
    googleAnalytics: "G-TH5VEMBXCG",
    siteUrl: "https://shekar-raja.github.io/portfolio/",
  },

  // ── Hero section ────────────────────────────────────────────────────────────
  // Greeting: shown above the name
  // cta: primary button (e.g. scroll to projects)
  // secondaryCta: secondary button (e.g. resume download)
  hero: {
    greeting: "Hey, I'm",
    cta: { label: "View My Work", href: "#projects" },
    secondaryCta: {
      label: "Download CV",
      href: "https://drive.google.com/file/d/1GvuQLTMwQZvWREcrDMe2kdtXRybcVzuw/view?usp=sharing",
    },
  },

  // ── Navigation links ────────────────────────────────────────────────────────
  // Order here = order in the nav bar.
  // href must match the section id (e.g. href: "#projects" → <section id="projects">)
  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Writing", href: "#writing" },
    { label: "Contact", href: "#contact" },
  ],

  // ── About section ───────────────────────────────────────────────────────────
  // bio: array of paragraphs — each entry becomes a separate <p>
  // stats: the four highlight numbers shown below the bio
  about: {
    heading: "Engineering data systems that scale.",
    bio: [
      "I'm a Cloud Data Engineer with 5+ years building production-grade data infrastructure on AWS. I specialise in serverless architectures, real-time IoT pipelines, and ML systems that move from prototype to prod.",
      "Currently at Koolmill Systems, I own the full data stack — from DynamoDB schema design and zero-downtime migrations to Terraform-managed infrastructure and GitHub Actions CI/CD. Previously at TruNums and Groundhog Apps, I shipped ETL pipelines, microservices, and analytics platforms serving tens of thousands of users.",
    ],
    stats: [
      { value: "5+", label: "Years Shipping" },
      { value: "10k+", label: "Device Streams" },
      { value: "50%", label: "Cost Reduction" },
      { value: "3", label: "Cloud Projects" },
    ],
  },

  // ── Work experience ─────────────────────────────────────────────────────────
  // Most recent first.
  // bullets: key achievements — keep each under ~120 chars for clean rendering
  // tags: shown as pill badges below the bullets
  experience: [
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
  ],

  // ── Projects ─────────────────────────────────────────────────────────────────
  // To add a project: copy a block below, fill in details, save — it appears instantly.
  // image: path relative to /public (optional — leave empty string for gradient fallback)
  // link: live demo URL (optional)
  // github: repo URL (optional)
  // accent: hex color used for the card glow + tag pills
  projects: [
    {
      title: "AlertOps AI",
      description:
        "LLM-powered on-call assistant that parses PagerDuty alerts, queries runbooks, and drafts a root-cause summary — reducing MTTR by 35%.",
      tags: ["Python", "OpenAI API", "LangChain", "PagerDuty", "FastAPI"],
      github: "https://github.com/shekar-raja",
      image: "",
      accent: "#22d3ee",
    },
    {
      title: "Real-Time IoT Pipeline",
      description:
        "End-to-end AWS serverless pipeline (IoT Core → Kinesis → Lambda → DynamoDB) handling 10k concurrent device streams with < 100ms p99.",
      tags: ["AWS IoT Core", "Kinesis", "Lambda", "DynamoDB", "Terraform"],
      github: "https://github.com/shekar-raja",
      image: "",
      accent: "#6366f1",
    },
    {
      title: "Exoplanet Detection ML",
      description:
        "Trained a CNN on NASA Kepler light-curve data to classify planetary transit signals with 97% F1-score, beating transit-search baselines.",
      tags: ["Python", "TensorFlow", "NASA Kepler", "Signal Processing"],
      github: "https://github.com/shekar-raja",
      image: "",
      accent: "#22d3ee",
    },
    {
      title: "Leo — AI Chatbot",
      description:
        "Conversational AI assistant built on fine-tuned GPT-3.5 with RAG over a custom knowledge base; integrated into Slack and WhatsApp.",
      tags: ["GPT-3.5", "LangChain", "RAG", "Pinecone", "Slack API"],
      github: "https://github.com/shekar-raja",
      image: "",
      accent: "#6366f1",
    },
    {
      title: "Adobe XD Layout Plugin",
      description:
        "Published Adobe XD plugin (500+ installs) that auto-generates accessible responsive grid layouts from component selection.",
      tags: ["JavaScript", "Adobe XD APIs", "CSS Grid", "Accessibility"],
      github: "https://github.com/shekar-raja",
      image: "",
      accent: "#22d3ee",
    },
  ],

  // ── Skills ───────────────────────────────────────────────────────────────────
  // category: displayed as the group heading
  // icon: emoji fallback (future: swap for react-icons key)
  // color: accent color for the skill group card
  // skills: list of tool/technology names
  skills: [
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
      skills: [
        "Grafana",
        "Prometheus",
        "CloudWatch",
        "Datadog",
        "OpenTelemetry",
      ],
    },
    {
      category: "Databases",
      icon: "🗄️",
      color: "#6366f1",
      skills: [
        "DynamoDB",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Redshift",
        "MySQL",
      ],
    },
    {
      category: "Languages",
      icon: "💻",
      color: "#22d3ee",
      skills: ["Python", "TypeScript", "JavaScript", "SQL", "Bash", "HCL"],
    },
  ],

  // ── Education ────────────────────────────────────────────────────────────────
  // Most recent first.
  education: [
    {
      degree: "MSc Computer Science",
      institution: "University of Hertfordshire",
      period: "Sep 2022 – Nov 2024",
      location: "Hatfield, UK",
      detail:
        "Focused on Machine Learning, Cloud Computing and Distributed Systems. Dissertation on real-time anomaly detection in IoT sensor data using LSTM autoencoders.",
      accent: "#6366f1",
    },
    {
      degree: "BSc Computer Science & Engineering",
      institution: "HITM (JNTU Hyderabad)",
      period: "Jun 2015 – Aug 2019",
      location: "Hyderabad, India",
      detail:
        "Core curriculum covering algorithms, data structures, database systems and software engineering. Final-year project on NLP-based automated ticket classification.",
      accent: "#22d3ee",
    },
  ],

  // ── Writing / Blog ────────────────────────────────────────────────────────
  // To add a post: copy a block, fill details, save — it appears on the site.
  // thumbnail: path relative to /public (e.g. /images/blogs/my-post.png)
  // url: full URL to the published post (Medium, Dev.to, personal blog, etc.)
  writing: [
    {
      title: "Vector Databases Explained: From Embeddings to Production",
      summary:
        "A practical deep-dive into how vector DBs work, when to use Pinecone vs pgvector vs Weaviate, and patterns for RAG pipelines at scale.",
      date: "2025-01-15",
      url: "https://medium.com/@rshekar",
      thumbnail: "/images/blogs/vector-db-thumbnail.png",
      readTime: "8 min read",
      tags: ["Vector DB", "RAG", "LLM", "Pinecone"],
    },
  ],

  // ── Contact section ───────────────────────────────────────────────────────
  // heading + subtext are displayed above the contact links.
  // Email + LinkedIn + GitHub are pulled from personal above — no duplication.
  contact: {
    heading: "Let's build something.",
    subtext:
      "Open to senior data engineering roles, contract work, and interesting technical problems. Drop me a line.",
  },
};

export default portfolioConfig;
