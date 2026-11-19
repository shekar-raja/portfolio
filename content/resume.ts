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
    credit: {
      label: string;
      href: string;
    };
  };
}

export const resume: ResumeData = {
  name: "Bhavya Verma",
  role: "Product & Developer Experience Engineer",
  lede: "I ship the feature, write the docs, and show up in the Discord to hear what broke.",
  links: [
    { label: "email", href: "mailto:vbhavya269@gmail.com" },
    { label: "x / @Bee_Bombshell", href: "https://x.com/Bee_Bombshell" },
    { label: "github", href: "https://github.com/BeeBombshell" },
    { label: "beebombshell.com", href: "https://beebombshell.com" },
  ],
  about: [
    "I started in open source. In 2022, while finishing my B.Tech, I joined **Rowy** and spent a year building the automation and integration plumbing that let people wire a backend together without writing it from scratch.",
    "Then I joined **BuildShip** and grew from engineer into product owner. I built the integration framework behind 200+ APIs, shipped the AI workflow generator, took a Framer plugin from idea to 5,000+ monthly users, wrote the documentation at docs.buildship.com, and sat with enterprise customers until their workflows actually ran.",
    "Across both, the loop was the same: **build it, document it, demo it, listen, repeat.** That loop is how I helped grow two communities to 15k+ members and ship 9+ Product Hunt launches. In my head it was never three jobs. It was one: make developers successful.",
  ],
  snapshot: [
    "3+ years at early-stage startups",
    "15k+ community members built",
    "9+ Product Hunt launches",
    "Shipped a Framer plugin with 5,000+ MAU",
  ],
  experience: [
    {
      title: "BuildShip · Software Engineer (Product)",
      meta: "Sept 2023 – Oct 2025",
      org: "Remote · low-code AI workflow builder",
      blurb:
        "Every new API meant weeks of hand-written integration work. I replaced that with a framework, then kept going until the whole product felt dependable.",
      bullets: [
        "**Cut integration maintenance by 85%** across 200+ integrations with a dynamic framework built on OpenAPI specs and OAuth 2.0. New third-party APIs now ship much faster.",
        "**Scaled event-driven workflows to thousands of concurrent runs** on GCP Pub/Sub and Cloud Tasks, with 99.9% uptime and zero-data-loss delivery.",
        "**Made AI workflows 72% more consistent in production** as technical owner of workflow generation, shipping LLM infrastructure and function calling across Claude, Gemini and Groq.",
        "**Cut enterprise onboarding drop-off by 25%** by leading deployments and designing custom Human-in-the-Loop and AI workflow solutions with product and success teams.",
        "**Owned the docs.** I wrote the guides, templates and deployment frameworks that turned one-off customer setups into a repeatable playbook.",
        "**Built the community from zero:** office hours, demos, roadmap discussions, support sessions and hackathons, plus multiple Product Hunt launches.",
        "Instrumented 500+ workflow nodes with PostHog and internal telemetry, so debugging and activation analysis stopped being guesswork.",
      ],
    },
    {
      title: "Rowy · Software Engineer (OSS)",
      meta: "Aug 2022 – Sept 2023",
      org: "Remote · open source backend platform",
      blurb:
        "My first real product job, done entirely in public. Every feature I shipped was read, forked and criticized within days.",
      bullets: [
        "Built the event-driven automation layer on Cloud Functions and webhooks, powering SendGrid, Twilio, Slack, Discord, DocSync and Algolia.",
        "Designed an extensible webhook framework for Typeform, Stripe and others, plus bulk CSV/JSON import and export with Airtable, PostgreSQL and SQL integrations.",
        "Built AI tooling that triages and summarizes GitHub Discussions, so the team spent less time sorting and more time answering.",
        "Grew the Rowy community from scratch through office hours, demos, roadmap talks and hackathons.",
      ],
    },
  ],
  projects: [
    {
      title: "CMS Data Sync for Framer",
      titleHref: "https://www.framer.com/marketplace/plugins/cms-data-sync/",
      meta: "5,000+ MAU · BuildShip",
      org: "Framer sites that stay in sync with any database, with no copy-pasting.",
      bullets: [
        "**Ideated and architected it end to end.** Published on the Framer Marketplace in April 2025, it now has 5,000+ monthly active users.",
        "Pulls data from Supabase, Firebase, Postgres, Google Sheets, Airtable, scraped sites or AI-generated content into Framer CMS, served through an instant API webhook built on BuildShip workflows.",
        "Syncs with upserts, so only changed records are pushed and everything else is left untouched.",
        "**Every plugin user is a BuildShip user.** It ships as a BuildShip integration, so the plugin doubles as an acquisition channel.",
      ],
    },
    {
      title: "Brilliant",
      titleHref: "https://github.com/BeeBombshell/brilliant",
      meta: "AI calendar manager · open source",
      org: "Scheduling should be a sentence, not a form.",
      bullets: [
        "A conversational agent with generative UI and schema-driven workflows that reads your real calendar before it acts.",
        "Two-way Google Calendar sync with batch execution, recurring events and checkpoint-based rollback, so a bad AI edit can be undone.",
      ],
    },
    {
      title: "Stickle",
      titleHref: "https://stickle.beebombshell.com/",
      meta: "open source AI sticky notes",
      org: "Notes on the web that stay where you put them.",
      bullets: [
        "A five-tier anchoring system that keeps each note attached to the right element through DOM changes and re-renders.",
        "Local and remote MCP support, so AI agents can read and act on the notes attached to a page.",
      ],
    },
    {
      title: "Whodunit",
      titleHref: "https://whodunit.beebombshell.com",
      meta: "[github](https://github.com/BeeBombshell/whodunit-ping) · MIT",
      org: "“Somebody pinged you. Nobody knows who.”",
      bullets: [
        "A self-hostable anonymous “ping me” form that lands as a push notification on your phone, with no sender identity attached.",
        "Private by design: no IPs stored, rate-limit keys that are salted-hashed and expire daily, zero telemetry.",
        "A zero-dependency `<whodunit-form>` web component and a portable Web-API core that runs on Cloudflare Workers, Node, Vercel Edge, Deno and Bun. Delivers via ntfy, Pushover, Telegram, Discord or email.",
      ],
    },
    {
      title: "Spotify Now Playing",
      titleHref: "https://github.com/BeeBombshell/spotify-now-playing",
      meta: "[live](https://spotify.beebombshell.com) · 5 stars",
      org: "A live “now playing” card for any GitHub README or site.",
      bullets: [
        "Spotify OAuth 2.0 with CSRF-safe state, token refresh, Firestore storage and signed httpOnly sessions.",
        "Renders a crisp SVG with a 30-second cache to protect rate limits. Users bring their own Spotify credentials, which sidesteps Spotify’s 25-user developer cap.",
      ],
    },
    {
      title: "beebombshell.com",
      titleHref: "https://github.com/BeeBombshell/beebombshell-com",
      meta: "this portfolio",
      org: "My corner of the internet, built in public.",
      bullets: [
        "Next.js and Firebase, with 85+ commits of iteration in the open.",
      ],
    },
  ],
  launches: {
    intro:
      "I’ve helped launch 9+ products on [Product Hunt](https://www.producthunt.com/@beebombshell), and my profile carries a **Top 5 Launch** badge. A few of them:",
    items: [
      {
        label: "BuildShip Tools",
        href: "https://www.producthunt.com/products/buildship?launch=buildship-tools",
        date: "May 2025",
      },
      {
        label: "BuildShip V2",
        href: "https://www.producthunt.com/products/buildship?launch=buildship-v2",
        date: "Nov 2024",
      },
      {
        label: "AI Assistant and Bot Builder",
        href: "https://www.producthunt.com/products/ai-bot-builder?launch=ai-assistant-and-bot-builder",
        date: "May 2024",
      },
      {
        label: "BuildShip",
        href: "https://www.producthunt.com/products/buildship?launch=buildship",
        date: "Sep 2023",
      },
      {
        label: "NoCodeCMS",
        href: "https://www.producthunt.com/products/nocodecms",
        date: "Jun 2023",
      },
      {
        label: "AI Bot Builder",
        href: "https://www.producthunt.com/products/ai-bot-builder?launch=ai-bot-builder",
        date: "Apr 2023",
      },
      {
        label: "ParallelGPT",
        href: "https://www.producthunt.com/products/parallelgpt",
        date: "Mar 2023",
      },
    ],
  },
  community: {
    intro:
      "Communities were never a side quest for me. Founders get their sharpest product feedback in a live demo or a roadmap thread, so I built the places where that happens, for Rowy and for BuildShip.",
    bullets: [
      "Hosted office hours, demos, roadmap discussions, support sessions and hackathons that grew two communities from scratch to **15k+ members**.",
      "Contributor to UNICEF Innovation, Fedora, Apache APISIX and Tambo AI.",
      "Mentor at Grace Hopper Celebration (Open Source Day) and volunteer with AnitaB.org and Women Who Code.",
      "I grow my audience on X, collaborate with founders and write about developer tools. Come say hi.",
    ],
  },
  skills: [
    { label: "Languages", value: "TypeScript, JavaScript, SQL" },
    { label: "Frameworks", value: "React, Next.js, Node.js, Express.js" },
    {
      label: "AI & workflows",
      value:
        "LLM workflows, agent orchestration, function calling, RAG, MCP, webhooks, OAuth 2.0",
    },
    {
      label: "Infra & data",
      value:
        "GCP (Cloud Run, Pub/Sub, Cloud Tasks), Postgres, Firestore, MongoDB",
    },
    {
      label: "Product & DevRel",
      value:
        "API design, technical docs, OpenAPI, developer tooling, PostHog, community building, content",
    },
  ],
  education: {
    title: "Cluster Innovation Centre, University of Delhi",
    meta: "2019 – 2023",
    org: "B.Tech, Information Technology & Mathematical Innovations · CGPA 9.3",
    bullets: [],
  },
  contact: {
    intro:
      "I’m looking for roles where product, engineering and community overlap. Say hello if you’re hiring for:",
    roles: [
      "Product / Software Engineer",
      "APM / PM",
      "GTM / Growth Engineer",
      "DevRel / Content",
    ],
    links: [
      { label: "vbhavya269@gmail.com", href: "mailto:vbhavya269@gmail.com" },
      { label: "@Bee_Bombshell", href: "https://x.com/Bee_Bombshell" },
      {
        label: "github.com/BeeBombshell",
        href: "https://github.com/BeeBombshell",
      },
      // TODO(linkedin): LinkedIn is missing; add when available
    ],
  },
  footer: {
    hint: "Hit “Rebuild this page” (bottom right) or press Alt+Shift+S.",
    credit: {
      label: "Cursor effect: Swarm by Joel Califa",
      href: "https://califa.github.io/swarm-site/",
    },
  },
};
