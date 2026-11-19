/**
 * lib/copy.ts
 * Single source of truth for all copy across rshekar.me.
 * Conforms to copy.md and design.md.
 */

export const COPY = {
  // Voice & Facts
  site: {
    title: "Raja Shekar",
    titleTemplate: "%s · Raja Shekar",
    tagline: "Curious engineer. Data-driven builder.",
  },
  seo: {
    description:
      "Raja Shekar is a cloud data engineer. Data pipelines, AI solutions, projects, writing, and views nobody asked for.",
    ogTitle: "Raja Shekar · I'm fascinated by all things data",
    ogDescription:
      "Cloud data engineer. Pipelines, AI, projects, writing, and a lanyard that swings.",
    jsonLdDescription:
      "Cloud data engineer with 5+ years of software engineering experience, building data pipelines, AI solutions, and applications.",
    badgeAlt:
      "A holographic ID badge with a glossy blob character, hanging from a black lanyard.",
  },
  bio: {
    oneLiner:
      "Cloud data engineer. I'm fascinated by all things data.",
    short:
      "Cloud data engineer. Fascinated by all things data: pipelines, AI solutions, and applications. Five-plus years in software, curious about how things work.",
    medium:
      "I'm Raja, a cloud data engineer who has always been curious about how things work. That curiosity took me from full stack web applications into data, cloud engineering, and applied AI. I have over five years of experience as a software engineer, and today I'm at Koolmill Systems, contributing to an Innovate UK funded project on smart systems for rice milling. What drives me is the chance to keep learning, keep building, and make solutions that matter.",
    long: [
      "I'm a cloud data engineer, fascinated by all things data: building data pipelines, AI solutions, and applications.",
      "I've always been curious about how things work. That curiosity first led me into full stack web applications and, over time, into data, cloud engineering, and applied AI.",
      "With over five years as a software engineer, I now focus on designing and delivering data driven systems that turn ideas into real world solutions.",
      "I'm currently a Cloud Data Engineer at Koolmill Systems Limited, contributing to an Innovate UK funded project developing next generation smart systems for rice milling.",
      "What drives me is the opportunity to keep learning, keep building, and create solutions that matter.",
    ],
  },
  card: {
    label: "Raja Shekar",
    meta: "Cloud data engineer · Data & AI.",
    headline: "Hi, I'm Raja. I'm fascinated by all things data.",
    headlineLead: "Hi, I'm Raja. I'm fascinated by ",
    headlineAccent: "all things data.",
    bio: "Cloud data engineer. Fascinated by all things data: pipelines, AI solutions, and applications. Five-plus years in software, curious about how things work.",
    chips: ["5+ yrs", "cloud data", "AWS"],
    hint: "psst, flip me",
    hintBack: "flip me back",
    back: {
      label: "Find me",
      book: "email me",
      writing: "writing",
      llms: "llms.txt",
      x: "linkedin ↗",
    },
  },
  nav: {
    index: "index",
    work: "work",
    writing: "writing",
    about: "about",
    ping: "ping",
    calendarTooltip: "Email me",
    llmsLabel: "llms.txt",
    llmsTooltip: "For the robots (and the curious)",
    themeToDark: "Lights off",
    themeToLight: "Lights on",
    statusOpen: "open for chats",
    statusBusy: "heads down, back soon",
    statusTooltip: "currently: building data things",
  },
  ping: {
    eyebrow: "ANONYMOUS PING",
    headlineLead: "Send me a ping. I won't know ",
    headlineAccent: "it was you.",
    explainer:
      "Anonymous notes, confessions, roasts, or honest feedback delivered straight to my phone.",
    disclosure:
      "No name, IP or browser details are stored. I may share pings publicly, without anything that could identify you.",
    sharingRules:
      "My rules when sharing: post only the message text, no tag or metadata; strip names and handles of third parties; skip anything abusive or that could identify the sender.",
    footerHint: "arrows change tag and prompt · Ctrl+Enter sends",
    deliveredToast: "Delivered. Raja's phone just buzzed.",
    errorToast: "Couldn't send. Press Enter to retry.",
    micDisabledNotice:
      "Speech recognition is disabled on purpose: browser speech APIs can send audio to third-party cloud servers. To guarantee zero tracking, only keyboard input is accepted.",
    dailyLimitReached: "Daily limit reached (3/3). Come back tomorrow!",
  },
  index: {
    scrollHint: "scroll. the badge will survive.",
    workIntroTitle: "Things I've shipped",
  },
  about: {
    title: "About",
    howTitle: "How I work",
    howItems: [
      "Curious first. Understand how it works, then build it.",
      "Data driven systems should turn ideas into real world solutions.",
      "Keep learning, keep building.",
      "Functions describe the world. Let's write ours together.",
    ],
    ossTitle: "Data, cloud and AI",
    ossBody:
      "I moved from full stack web applications into data, cloud engineering, and applied AI. I like building things that make a tangible difference, from operational efficiency to sustainability goals.",
    ossProjects:
      "Projects across machine learning, data pipelines, and the cloud.",
    offclockTitle: "Off the clock",
    offclockBody:
      "Mostly still near a computer, if I'm honest. Say hi anyway.",
    funTitle: "Fun facts",
    funItems: [
      "Has a published Adobe XD plugin (500+ installs).",
      "MSc thesis was about finding exoplanets.",
      "Believes functions describe the world.",
      "Opinions per day: curiously few.",
    ],
    nowTitle: "Currently",
    nowBody: "Cloud Data Engineer at Koolmill Systems.",
  },
  work: {
    title: "Work",
    intro: "Selected work. Data, AI, and a plugin or two.",
    cardHint: "click to open",
    cardOpenLabel: "open case study",
    stars: "{n} stars",
  },
  writing: {
    title: "Writing",
    intro: "Notes on data, as I learn it.",
    empty: "First post loading. Notes are being taken.",
    readTime: "{n} min read · skimmable",
    tagsLabel: "filed under",
    rss: "RSS, which still exists and is great",
    postFooter: "Disagree? Drop me a line. ↗",
    draftBanner: "Draft. You weren't supposed to see this. (Hi.)",
  },
  views: {
    title: "Views nobody asked for",
    sub: "Short, sincere, and still unreviewed.",
    cta: "Disagree with me by email ↗",
    empty: "No takes today. Suspicious.",
    takes: [
      "Functions describe the world—let's write ours together.",
      "Curious about how things work, and always happy to keep learning and building.",
      "Fascinated by all things data.",
    ],
  },
  booking: {
    title: "Let's talk",
    sub: "Send an email. I'll reply.",
    topics:
      "Data pipelines, cloud, AI, an opportunity, or just saying hi.",
    cta: "Send an email",
    success: "Sent. I'll get back to you.",
    error: "Something went wrong. Email me directly: {email}",
    close: "close",
    busy: "Busy for now. Email me and I'll get back to you.",
  },
  llms: {
    toggle: "llms.txt",
    panelTitle: "llms.txt",
    panelNote: "Same content, zero decoration. Hello, machine.",
    panelBack: "back to the pretty version",
    panelCopy: "copy",
    panelCopied: "copied",
  },
  spotify: {
    playing: "now playing · {track} — {artist}",
    paused: "paused · {track}",
    lastPlayed: "last played · {track} — {artist}",
    offline: "offline",
    tooltip: "Live from my Spotify. Yes, really.",
    aria: "Currently playing {track} by {artist} on Spotify.",
    pillHint: "hover for the track",
  },
  tab: {
    away: "come back, I was mid-thought",
    return: "oh, hi",
  },
  egg: {
    console:
      "Hi, you opened devtools. Respect. The physics on that badge is a rope sim. If you're hiring, building, or just curious: rshekar.contact@gmail.com",
    htmlComment:
      "You found the source. The lanyard is a verlet rope. Say hi: rshekar.contact@gmail.com",
    logoClick: "ouch.",
  },
  footer: {
    status: "Open for chats",
    heading: "Let's talk",
    sub: "Bring a problem or a hello. I'll reply.",
    cta: "Send an email",
    copyright: "© 2026 rshekar.me",
    top: "up we go",
    links: {
      github: "GitHub",
      x: "Email",
      linkedin: "LinkedIn",
      llms: "llms.txt",
    },
  },
  a11y: {
    reducedMotion: "Motion is off. The badge is just hanging out.",
    badgeLabel: "Interactive ID badge, press Enter to flip",
    badgeFront: "Badge front, showing my intro.",
    badgeBack: "Badge back, showing links.",
    notchLabel: "Main navigation",
    skip: "Skip to content",
    canvas: "decorative, hidden from screen readers",
  },
  state: {
    notFoundTitle: "Nothing here.",
    notFoundBody: "I checked twice. The data says nothing's here.",
    notFoundCta: "take me home",
    errorTitle: "Something broke.",
    errorBody: "Not you, me. I've been told.",
    errorCta: "try again",
    loading: "warming up the particles…",
    offline: "You're offline. The badge is on its own for now.",
    emptyProjects: "Nothing here yet. Impossible, but here we are.",
    formError: "That didn't go through. Try once more?",
    copied: "copied",
  },
  links: {
    github: "GitHub ↗",
    x: "Email ↗",
    linkedin: "LinkedIn ↗",
    email: "Email",
    site: "rshekar.me",
  },
} as const;

export type CopyKey = keyof typeof COPY;
