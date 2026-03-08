# Portfolio

A personal portfolio template built with Next.js, Three.js, GSAP and Framer Motion. All content is driven by a single TypeScript config file — fork the repo, fill in your details, and deploy to GitHub Pages in minutes.

**Live demo:** https://shekar-raja.github.io/portfolio/

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-0.183-black?logo=threedotjs)

---

## Features

- **Single config file** — every word on the site lives in `src/data/portfolio.config.ts`
- **Sections** — Hero, About, Experience, Projects, Skills, Education, Writing, Testimonials, Contact
- **3D animated background** — Three.js WebGL canvas with blackhole and star-field effects
- **Smooth scroll animations** — GSAP timeline + Framer Motion + Lenis scroll
- **Custom cursor** — responsive cursor that reacts to hover states
- **Skill icons** — auto-resolved brand icons via `react-icons`; unknown skills degrade gracefully
- **Google Analytics** — drop your GA4 measurement ID into the config, done
- **Static export** — builds to plain HTML/CSS/JS; no server needed
- **GitHub Pages CI/CD** — push to `main` and the site deploys automatically

---

## Quick Start

### 1. Fork & clone

Fork this repo on GitHub, then clone your fork:

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set the base path

Open `next.config.ts` and change `/portfolio` to match **your GitHub repository name**:

```ts
const nextConfig: NextConfig = {
  basePath: "/<your-repo-name>", // e.g. "/my-portfolio"
  // ...
};
```

> **This is the most common gotcha for forkers.** If your repo is named `my-portfolio`, the base path must be `/my-portfolio`.

### 4. Fill in your content

Edit `src/data/portfolio.config.ts` — see the [Configuration Guide](#configuration-guide) below.

### 5. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000/<your-repo-name>` in your browser. The site hot-reloads as you edit the config.

---

## Configuration Guide

**All content lives in one file: [`src/data/portfolio.config.ts`](src/data/portfolio.config.ts)**

Every section below maps directly to a key in that file. Full TypeScript types are defined in [`src/types/portfolio.ts`](src/types/portfolio.ts) — your editor will autocomplete and flag errors automatically.

---

### `personal` — Identity & meta

Used everywhere: the `<title>` tag, Open Graph tags, Nav tooltip, Hero, Footer, and Contact section.

```ts
personal: {
  name: "Your Name",
  initials: "YN",          // shown as avatar fallback text
  title: "Your Job Title",
  tagline: "One-line value proposition.",
  description: "Two-sentence bio for SEO meta description.",
  email: "you@example.com",
  linkedin: "https://www.linkedin.com/in/your-profile/",
  github: "https://github.com/your-username",
  resume: "https://link-to-your-resume.pdf",
  avatar: "/<your-repo-name>/images/headshot.png",  // local file in /public — OR a Google Drive share link
  googleAnalytics: "G-XXXXXXXXXX",  // your GA4 ID — leave "" to disable
  siteUrl: "https://<your-username>.github.io/<your-repo-name>/",
}
```

> **`avatar` supports two formats — use whichever is easier:**
>
> - **Local file:** place the image in `public/images/` and set `avatar` to `"/<your-repo-name>/images/headshot.png"` (must include the basePath prefix).
> - **Google Drive link:** upload the image to Google Drive, set sharing to _Anyone with the link can view_, then paste the share URL (e.g. `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`). The site converts it to a direct image URL automatically.
>
> A shimmer skeleton is shown in the About section while the headshot loads.

---

### `hero` — Hero section

```ts
hero: {
  greeting: "Hey, I'm",      // text shown above your name
  cta: {
    label: "View My Work",
    href: "#projects",       // scrolls to the projects section
  },
  secondaryCta: {
    label: "Download CV",
    href: "https://link-to-your-resume.pdf",
  },
}
```

---

### `nav` — Navigation links

Order here equals order in the nav bar. The `href` values must match the `id` of the corresponding section (e.g. `"#projects"` targets `<section id="projects">`).

```ts
nav: [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  // add, remove, or reorder entries freely
];
```

---

### `about` — About section

`bio` is an array of strings — each string becomes a separate paragraph. `stats` are the highlight numbers displayed beneath the bio.

```ts
about: {
  heading: "Your catchy heading.",
  bio: [
    "First paragraph about yourself.",
    "Second paragraph.",
    // add as many paragraphs as you like
  ],
  stats: [
    { value: "5+",  label: "Years Experience" },
    { value: "20+", label: "Projects Shipped" },
    // up to ~4 stats look best
  ],
}
```

---

### `experience` — Work history

List entries most-recent first. `bullets` are achievement statements; `tags` appear as pill badges.

```ts
experience: [
  {
    role: "Senior Engineer",
    company: "Acme Corp",
    period: "Jan 2023 – Present",
    location: "London, UK",
    bullets: [
      "Built X, which achieved Y by doing Z.",
      // keep each bullet under ~120 chars for clean rendering
    ],
    tags: ["Python", "AWS", "Terraform"],
  },
  // add more entries...
];
```

---

### `projects` — Project showcase

Leave `image` as `""` to use the accent-color gradient fallback. `link` (live demo) is optional; `github` is optional.

```ts
projects: [
  {
    title: "My Project",
    description: "What it does and why it matters.",
    tags: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com/your-username/my-project",
    link: "https://my-project.vercel.app", // optional live demo
    image: "/my-portfolio/images/my-project.png", // optional, or "" for gradient
    accent: "#6366f1", // hex color for card glow and tag pills
  },
];
```

---

### `skills` — Skill groups

Each group renders as a card with an emoji heading and color accent. `skills` is a plain list of technology names — icons are resolved automatically (see [Customizing Skill Icons](#customizing-skill-icons)).

```ts
skills: [
  {
    category: "Languages & Backend",
    icon: "💻", // emoji shown in the card header
    color: "#22d3ee", // card accent color
    skills: ["Python", "TypeScript", "Node.js", "FastAPI"],
  },
  // add as many groups as needed
];
```

---

### `education` — Degrees & credentials

Most recent first. `accent` controls the card highlight color.

```ts
education: [
  {
    degree: "MSc Computer Science",
    institution: "University of Somewhere",
    period: "Sep 2020 – Jun 2022",
    location: "City, Country",
    detail: "Dissertation or notable focus area.",
    accent: "#6366f1",
  },
];
```

---

### `writing` — Blog posts / articles

`url` is the full link to the published post (Medium, Dev.to, personal blog, etc.). `thumbnail` is a path inside `/public`; leave it as `""` if you don't have one.

```ts
writing: [
  {
    title: "My Article Title",
    summary: "One or two sentences summarising the post.",
    date: "2025-06-01", // ISO format: YYYY-MM-DD
    url: "https://medium.com/@you/my-article",
    thumbnail: "/my-portfolio/images/blogs/my-article.png", // or ""
    readTime: "5 min read",
    tags: ["AWS", "Serverless"],
  },
];
```

---

### `testimonials` — Recommendations

`initials` is used as the avatar placeholder. `accent` sets the card border color.

```ts
testimonials: [
  {
    name: "Jane Smith",
    role: "Engineering Manager at Acme",
    relationship: "Managed me directly",
    quote: "Full recommendation text here...",
    initials: "JS",
    accent: "#6366f1",
  },
];
```

---

### `contact` — Contact section

```ts
contact: {
  heading: "Let's build something together.",
  subtext: "Open to roles, freelance projects and interesting conversations. Drop me a line.",
}
```

---

## Assets

### Headshot

You have two options:

**Option A — Local file (recommended for fast load)**

1. Place your photo at `public/images/headshot.png` (or any path under `public/`).
2. Set `personal.avatar` in `portfolio.config.ts` to `"/<your-repo-name>/images/headshot.png"`.
   - The path must start with your `basePath` (e.g. `/portfolio/images/headshot.png`).
3. Recommended: square crop, at least 400×400 px.

**Option B — Google Drive link**

1. Upload your photo to Google Drive.
2. Right-click → _Share_ → set to _Anyone with the link can view_ → copy the link.
3. Paste the full share URL as `personal.avatar`, e.g.:
   ```
   avatar: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing"
   ```
4. The site automatically converts it to a direct image URL — no extra steps needed.

In both cases a shimmer skeleton placeholder is displayed in the About section while the image loads.

### Blog thumbnails

Place blog post preview images in:

```
public/images/blogs/
```

Reference them in `writing[].thumbnail` as `"/<your-repo-name>/images/blogs/<filename>.png"`.

---

## Deployment to GitHub Pages

The repo includes a ready-made GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). It runs `npm run build` and deploys the static output to GitHub Pages automatically on every push to `main` or `development`.

### One-time setup

1. Go to your forked repo on GitHub → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Push a commit — the workflow triggers and your site goes live at:
   ```
   https://<your-username>.github.io/<your-repo-name>/
   ```

### Manual / alternative deploy

```bash
npm run build   # outputs static site to out/
```

You can serve the `out/` directory from any static host (Vercel, Netlify, Cloudflare Pages, etc.). If you deploy to a root domain (no sub-path), set `basePath: ""` in `next.config.ts`.

---

## Project Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages CI/CD pipeline
├── public/
│   └── images/
│       ├── headshot.png        # your profile photo
│       └── blogs/              # blog post thumbnails
├── src/
│   ├── app/
│   │   ├── layout.tsx          # root layout (fonts, GA, global components)
│   │   ├── page.tsx            # single page — assembles all sections
│   │   └── globals.css         # global styles
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Education.tsx
│   │   ├── Writing.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   ├── BlackholeBackground.tsx  # Three.js WebGL background
│   │   ├── SpaceBackground.tsx      # star-field canvas layer
│   │   ├── Cursor.tsx               # custom mouse cursor
│   │   ├── SmoothScroll.tsx         # Lenis scroll integration
│   │   └── CharReveal.tsx           # GSAP text reveal animation
│   ├── data/
│   │   ├── portfolio.config.ts  # ← EDIT THIS to personalise the site
│   │   └── skillIcons.ts        # skill name → react-icons resolution map
│   └── types/
│       └── portfolio.ts         # TypeScript interfaces for the config
├── next.config.ts               # base path + static export settings
└── package.json
```

---

## Customizing Skill Icons

Skill icons are auto-resolved from the `skills` list in `portfolio.config.ts`. The resolver in [`src/data/skillIcons.ts`](src/data/skillIcons.ts) converts each skill name to a `react-icons` (Simple Icons) slug.

**If an icon isn't showing up**, add a manual alias to the `SKILL_ALIASES` map in `skillIcons.ts`:

```ts
const SKILL_ALIASES: Record<string, string> = {
  "My Custom Tool": "mycustomtool", // maps to SiMycustomtool from react-icons/si
};
```

Skills with no matching icon are silently skipped — the skill name still renders as a text badge.

To set a custom brand color for an icon, add it to `BRAND_COLORS` in the same file:

```ts
const BRAND_COLORS: Record<string, string> = {
  "My Custom Tool": "#FF5733",
};
```

---

## Tech Stack

| Layer         | Technology                                        |
| ------------- | ------------------------------------------------- |
| Framework     | Next.js 15 (App Router, static export)            |
| Language      | TypeScript 5                                      |
| Styling       | Tailwind CSS 4                                    |
| 3D / WebGL    | Three.js + @react-three/fiber + @react-three/drei |
| Animations    | GSAP 3 + @gsap/react                              |
| Motion        | Framer Motion 12                                  |
| Smooth Scroll | Lenis                                             |
| Icons         | react-icons (Simple Icons)                        |
| Fonts         | Inter + Sora (Google Fonts)                       |
| Deployment    | GitHub Pages via GitHub Actions                   |

---

## License

[MIT](LICENSE) — free to use and adapt for your own portfolio.
