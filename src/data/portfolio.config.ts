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
    initials: "RS.",
    title: "Cloud Data Engineer",
    tagline: "I'm a software engineer that is fascinated by all things data.",
    description:
      "That includes building data pipelines, AI solutions, and applications.",
    email: "rshekar.contact@gmail.com",
    linkedin: "https://www.linkedin.com/in/raja-shekar/",
    github: "https://github.com/shekar-raja",
    resume: "/portfolio/resume",
    resumeSource:
      "https://drive.google.com/file/d/1e3yACeZd0tu_MoEZa-VYf_7NrO9p2ZTX/view?usp=share_link",
    avatar:
      "https://drive.google.com/file/d/1c3G5PztdC2BoHsJANh33-YY-Axa9CrmZ/view?usp=sharing",
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
      href: "/portfolio/resume.pdf",
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
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],

  // ── About section ───────────────────────────────────────────────────────────
  // bio: array of paragraphs — each entry becomes a separate <p>
  // stats: the four highlight numbers shown below the bio
  about: {
    heading: "Curious engineer. Data-driven builder.",
    bio: [
      "I've always been curious about how things work. That curiosity first led me into building full stack web applications and, over time, into the world of data, cloud engineering, and applied AI.",
      "With over five years of experience as a software engineer, I now focus on designing and delivering data driven systems that turn ideas into real world solutions. My journey has evolved from crafting user facing applications to engineering smart, connected systems that can make a tangible difference, from improving operational efficiency to supporting sustainability goals.",
      "I'm currently a Cloud Data Engineer at Koolmill Systems Limited, contributing to an Innovate UK funded project developing next generation smart systems for rice milling. It's a role that blends my technical background with my passion for creating meaningful, impactful technology.",
      "What drives me is the opportunity to keep learning, keep building and create solutions that matter. Apart from siting in front of computer I love ",
    ],
    stats: [
      { value: "5+", label: "Years Industry Experience" },
      // { value: "", label: "" },
      // { value: "50%", label: "Cost Reduction" },
      // { value: "3", label: "Cloud Projects" },
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
      period: "Jun 2025 – Present",
      location: "Sheffield, UK",
      bullets: [
        "Contributed to the Innovate UK funded Digital Rice Mill Demonstrator project, developing a scalable cloud data platform for real-time monitoring of industrial rice milling machines.",
        "Architected end-to-end data architecture to ingest and process second-level industrial time-series telemetry from PLC-controlled milling systems via edge devices.",
        "Designed multi-tenant time-series data model, reducing large-range query latency from 25–35s to sub-second responses.",
        "Led zero-downtime production data migration (14-hour rollout) with validation checks, reducing database RCU/WCU consumption and operational costs.",
        "Built real-time telemetry ingestion pipelines using AWS IoT platform alongside batch ETL workflows for daily and monthly operational analytics.",
        "Implemented CI/CD and infrastructure automation using GitHub Actions, Docker, ECR, ECS and Terraform across multi-environment deployments.",
        "Designed secure API layer using IAM, ABAC policies and Cognito enabling tenant-level access control to industrial machine telemetry.",
      ],
      tags: [
        "AWS",
        "Python",
        "GitHub Actions",
        "CI/CD",
        "Docker",
        "Data Modelling",
        "Terraform",
        "Excel",
        "IOT",
        "Time-Series Data",
      ],
    },
    {
      role: "Software Engineer",
      company: "TruNums",
      period: "Oct 2022 – Jan 2024",
      location: "Remote, US",
      bullets: [
        "Developed and deployed a MEAN-stack social media platform serving 5,000+ global users, delivering scalable user interactions and real-time content features.",
        "Designed scalable MongoDB and Redis data models improving application performance and session handling.",
        "Deployed production releases via AWS, reducing downtime and ensuring stable global updates.",
      ],
      tags: [
        "Node.js",
        "Angular",
        "MongoDB",
        "Redis",
        "AWS",
        "Rest API",
        "CI/CD",
      ],
    },
    {
      role: "Software Engineer",
      company: "Groundhog Apps",
      period: "Dec 2019 – Aug 2022",
      location: "Hyderabad, India",
      bullets: [
        "Developed and maintained MEAN-stack applications for mining operations, contributing to a 40% increase in production throughput per shift.",
        "Automated shift-end reporting workflows, reducing manual reporting effort by 50%.",
        "Optimised database indexing strategies, reducing query latency by 20%.",
        "Designed and maintained REST APIs supporting operational analytics and reporting dashboards.",
      ],
      tags: ["Node.js", "Angular", "MongoDB", "Python", "REST API", "Redis"],
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
      title: "Exoplanet Detection ML",
      description:
        "Developed and evaluated an MLP model using the NASA Kepler dataset, applying feature engineering, model tuning, and cross-validation to classify planetary transit signals. MSc thesis project.",
      tags: ["Python", "PyTorch", "Pandas", "Scikit-Learn"],
      github: "https://github.com/shekar-raja/exoplanet-detection-system-ml",
      image: "",
      accent: "#f59e0b",
    },
    {
      title: "AlertOps AI",
      description:
        "Real-time DevOps log classification system using NLP and supervised learning (Random Forest, XGBoost, LSTM) to automatically prioritise operational alerts (P1–P4), reducing manual triaging and accelerating incident resolution.",
      tags: ["Python", "Kafka", "PyTorch", "Scikit-Learn", "FastAPI", "Azure"],
      github: "https://github.com/shekar-raja/alertops-ai",
      image: "",
      accent: "#2dd4bf",
    },
    {
      title: "Adobe XD Layout Plugin",
      description:
        "Published Adobe XD plugin (500+ installs) that auto-generates accessible responsive grid layouts from component selection.",
      tags: ["JavaScript", "Adobe XD APIs", "CSS Grid", "Accessibility"],
      github: "https://github.com/shekar-raja",
      image: "",
      accent: "#f59e0b",
    },
    {
      title: "AG Grid Dash",
      description:
        "Full-stack data dashboard with hybrid semantic search and a recommendation engine. Textual records are embedded into dense vectors via a FastAPI microservice and indexed in FAISS. At query time, both a traditional keyword filter and a FAISS nearest-neighbour search run in parallel — results are fused by score and ranked by semantic similarity, surfacing relevant rows even when exact terms don't match. The same embedding pipeline powers a recommendation system that suggests related records based on vector proximity, enabling discovery-style navigation across the dataset.",
      tags: ["Python", "FastAPI", "FAISS", "Node.js", "TypeScript", "MongoDB"],
      github: "https://github.com/shekar-raja/Image-Optimizer-AdobeXD",
      image: "",
      accent: "#2dd4bf",
    },
  ],

  // ── Skills ───────────────────────────────────────────────────────────────────
  // category: displayed as the group heading
  // icon: emoji fallback (future: swap for react-icons key)
  // color: accent color for the skill group card
  // skills: list of tool/technology names
  skills: [
    {
      category: "Languages & Backend",
      icon: "💻",
      color: "#2dd4bf",
      skills: [
        "Python",
        "SQL",
        "JavaScript",
        "Scala",
        "FastAPI",
        "Node.js",
        "React",
        "Angular",
      ],
    },
    {
      category: "Cloud & AWS",
      icon: "☁️",
      color: "#f59e0b",
      skills: [
        "S3",
        "AWS Lambda",
        "ECS",
        "IoT Core",
        "API Gateway",
        "Cognito",
        "CloudWatch",
        "SNS",
        "DynamoDB",
        "IAM",
        "SageMaker",
        "ECR",
      ],
    },
    {
      category: "DevOps & IaC",
      icon: "⚙️",
      color: "#2dd4bf",
      skills: ["Terraform", "Docker", "GitHub Actions", "IAM", "ABAC"],
    },
    {
      category: "Databases",
      icon: "🗄️",
      color: "#f59e0b",
      skills: ["DynamoDB", "PostgreSQL", "MongoDB", "Redis", "CouchDB"],
    },
    {
      category: "Data Engineering",
      icon: "🔄",
      color: "#2dd4bf",
      skills: [
        "ETL/ELT Pipelines",
        "Real-Time Streaming",
        "Time-Series Modelling",
        "Data Modelling",
        "Query Optimisation",
      ],
    },
    {
      category: "ML & Data Science",
      icon: "🧠",
      color: "#f59e0b",
      skills: ["PyTorch", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"],
    },
  ],

  // ── Education ────────────────────────────────────────────────────────────────
  // Most recent first.
  education: [
    {
      degree: "MSc Data Science and Analytics",
      institution: "University of Hertfordshire",
      period: "Sep 2022 – Nov 2024",
      location: "Hatfield, UK",
      detail:
        "Focused on Machine Learning, Cloud Computing and Data Analytics. Dissertation on exoplanet detection using machine learning with NASA Kepler dataset.",
      accent: "#f59e0b",
    },
    {
      degree: "BSc Computer Science",
      institution: "Hyderabad Institute of Technology and Management",
      period: "Jun 2015 – Aug 2019",
      location: "Hyderabad, India",
      detail:
        "Core curriculum covering algorithms, data structures, database systems and software engineering.",
      accent: "#2dd4bf",
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
      url: "https://rshekar.notion.site/Vector-Database-a-Brief-Introduction-dcf1604e3d604052be8d7070887084e9",
      thumbnail: "/images/blogs/vector-db-thumbnail.png",
      readTime: "8 min read",
      tags: ["Vector DB", "RAG", "LLM", "Pinecone"],
    },
  ],

  // ── Testimonials ─────────────────────────────────────────────────────────────
  // LinkedIn recommendations — add more entries to grow the list.
  // initials: 2-letter abbreviation used as avatar placeholder
  // accent: card highlight colour
  testimonials: [
    {
      name: "Bhaskar Ramachandran",
      role: "Senior .Net Core Architect",
      relationship: "Client at TruNums · June 2024",
      quote:
        "Raja consistently impressed me with his critical thinking and problem-solving skills. These strengths were invaluable as we navigated challenging situations that arose during the development process at TruNums. Raja's ability to analyze problems, come up with creative solutions, and implement them effectively made him a key asset to the project. Without a doubt, Raja would be a valuable addition to any development team. His technical expertise, combined with his quick learning, critical thinking and problem-solving skills, makes him a truly exceptional candidate.",
      initials: "BR",
      accent: "#f59e0b",
    },
    {
      name: "Prudhviraj Pampana",
      role: "Engineering Manager",
      relationship: "Direct Manager · May 2024",
      quote:
        "I had the pleasure of managing Raja for a significant duration, I was consistently impressed by his ability to remain calm and composed under pressure. His strong problem-solving skills and ability to think strategically helped navigate challenging situations effectively.",
      initials: "PP",
      accent: "#2dd4bf",
    },
  ],

  // ── Contact section ───────────────────────────────────────────────────────
  // heading + subtext are displayed above the contact links.
  // Email + LinkedIn + GitHub are pulled from personal above — no duplication.
  contact: {
    heading: "Get in Touch",
    subtext:
      "Drop me a message to ask a question, offer an opportunity or just say hi. I'll get back to you!",
  },
};

export default portfolioConfig;
