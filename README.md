# rshekar.me

Personal site of [Raja Shekar](https://rshekar.me), Cloud Data Engineer. Built with Next.js 16, Firebase and a fair amount of physics.

Design and engine adapted from [beebombshell-com](https://github.com/BeeBombshell/beebombshell-com) by Bhavya Verma.

## What's inside

| Feature | Notes |
|---|---|
| Notch nav | macOS-style notch that collapses into a floating pill on scroll |
| Badge hero | Lanyard and ID card on a Verlet rope simulation: drag, fling, flip. The back shows GitHub contributions and Spotify |
| Particle canvas | One fixed canvas whose particles morph per section (burst, lattice, contours, dashes) |
| Home sections | Work, experience, skills, education, writing, views, testimonials |
| `/resume` | Static, print-friendly resume with a PDF download fetched from Google Drive at build time |
| `/admin` | Password-protected CMS for profile, projects, posts and config (Firestore) |
| `/ping` | Anonymous message pad. Disabled until `PING_WEBHOOK_URL` is set |
| Feeds | `rss.xml`, `feed.xml`, `llms.txt`, `llms-full.txt`, sitemap, OG images |

## Stack

Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind v4, `motion`, Lenis, Firebase Admin (Firestore), zod, marked and shiki. Hosted on Vercel (Hobby plan).

## Local development

```bash
npm install
cp .env.example .env.local   # all variables are optional for local dev
npm run dev
```

With no Firebase credentials the site reads the JSON files in `content/seed/`. That is also the easiest way to edit content: change the JSON and the page hot-reloads.

## Content

| Data | Seed file | Firestore |
|---|---|---|
| Profile | `content/seed/profile.json` | `profile/main` |
| Site config | `content/seed/config.json` | `site/config` |
| Projects | `content/seed/projects.json` | `projects` |
| Posts | `content/seed/posts.json` | `posts` |
| Experience, education, skills, testimonials | `content/seed/*.json` | same names |
| Views | `content/views.json` | `takes` |
| UI copy | `lib/copy.ts` | (code) |
| Resume | `content/resume.ts` | (code) |

Push the seed files to Firestore with `npm run seed`. Production reads are cached for an hour per tag, and `/admin` edits refresh the cache immediately through `/api/revalidate`.

## Environment

See [`.env.example`](.env.example) for each variable and how to get it on a free tier.

| Variable | Needed for |
|---|---|
| `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Firestore (otherwise seed JSON is used) |
| `ADMIN_SECRET` | `/admin`. Admin is disabled when unset |
| `REVALIDATION_SECRET` | `/api/revalidate` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs (`https://rshekar.me`) |
| `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN` | Now-playing strip. Hidden when unset |
| `RESUME_SOURCE_URL` | Google Drive share link for the resume PDF |
| `PING_WEBHOOK_URL` | `/ping` delivery. Disabled when unset |

## Deployment

Vercel builds every push. `main` is production at https://rshekar.me, and other branches get preview URLs. Set the environment variables in the Vercel project for both Production and Preview.

## License

[MIT](LICENSE) for this repository's own code. The adapted design and engine come from beebombshell-com; see that repository for its terms.
