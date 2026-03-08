export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  accent: string;
}

export const projects: Project[] = [
  {
    title: "Exoplanet Detection ML",
    description:
      "Trained a CNN on NASA Kepler light-curve data to classify planetary transit signals with 97% F1-score, beating transit-search baselines.",
    tags: ["Python", "TensorFlow", "NASA Kepler", "Signal Processing"],
    github: "https://github.com/shekar-raja",
    accent: "#f59e0b",
  },
  {
    title: "AlertOps AI",
    description:
      "LLM-powered on-call assistant that parses PagerDuty alerts, queries runbooks, and drafts a root-cause summary — reducing MTTR by 35%.",
    tags: ["Python", "OpenAI API", "LangChain", "PagerDuty", "FastAPI"],
    github: "https://github.com/shekar-raja",
    accent: "#2dd4bf",
  },
  {
    title: "Real-Time IoT Pipeline",
    description:
      "End-to-end AWS serverless pipeline (IoT Core → Kinesis → Lambda → DynamoDB) handling 10k concurrent device streams with < 100ms p99.",
    tags: ["AWS IoT Core", "Kinesis", "Lambda", "DynamoDB", "Terraform"],
    github: "https://github.com/shekar-raja",
    accent: "#f59e0b",
  },
  {
    title: "Adobe XD Layout Plugin",
    description:
      "Published Adobe XD plugin (500+ installs) that auto-generates accessible responsive grid layouts from component selection.",
    tags: ["JavaScript", "Adobe XD APIs", "CSS Grid", "Accessibility"],
    github: "https://github.com/shekar-raja",
    accent: "#2dd4bf",
  },
  {
    title: "Titanic Survival EDA",
    description:
      "Deep exploratory analysis with feature engineering and ensemble models (XGBoost + Random Forest) reaching top-8% on Kaggle leaderboard.",
    tags: ["Python", "Pandas", "XGBoost", "Sklearn", "Seaborn"],
    github: "https://github.com/shekar-raja",
    accent: "#f59e0b",
  },
  {
    title: "Leo — AI Chatbot",
    description:
      "Conversational AI assistant built on fine-tuned GPT-3.5 with RAG over a custom knowledge base; integrated into Slack and WhatsApp.",
    tags: ["GPT-3.5", "LangChain", "RAG", "Pinecone", "Slack API"],
    github: "https://github.com/shekar-raja",
    accent: "#2dd4bf",
  },
];
