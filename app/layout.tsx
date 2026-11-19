import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SmoothScroll } from "@/components/scroll/smooth-scroll";
import { MainShell } from "@/components/layout/main-shell";
import { NotchNav } from "@/components/notch/notch-nav";
import { ParticleCanvas } from "@/components/particles/particle-canvas";
import { LlmsModal } from "@/components/llms/llms-modal";
import { JsonLd } from "@/components/seo/json-ld";
import { getConfig, getProfile } from "@/lib/queries";
import { COPY } from "@/lib/copy";
import { SITE_URL, SITE_NAME, AUTHOR_NAME, AUTHOR_ROLE, GITHUB_URL, LINKEDIN_URL, GA_ID } from "@/lib/site";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · ${AUTHOR_ROLE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Raja Shekar is a Cloud Data Engineer fascinated by all things data: data pipelines, AI solutions, and applications.",
  keywords: [
    "Raja Shekar",
    "Cloud Data Engineer",
    "Data Engineering",
    "Data Pipelines",
    "AWS",
    "AI",
    "Time-Series Data",
    "Frontend Physics",
    "Verlet Integration",
    "Canvas 2D",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: `${AUTHOR_NAME} · ${AUTHOR_ROLE}`,
    description:
      "Cloud data engineer building data pipelines, AI solutions, and applications.",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${AUTHOR_NAME} · ${AUTHOR_ROLE}`,
    description:
      "Cloud data engineer building data pipelines, AI solutions, and applications.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [config, profile] = await Promise.all([getConfig(), getProfile()]);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: AUTHOR_ROLE,
    url: SITE_URL,
    description:
      "Cloud Data Engineer building data pipelines, AI solutions, and applications.",
    sameAs: [GITHUB_URL, LINKEDIN_URL],
    knowsAbout: [
      "Cloud Data Engineering",
      "Data Pipelines",
      "Time-Series Data",
      "AWS",
      "Applied AI",
      "Python",
      "TypeScript",
      "Next.js",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: "Personal portfolio of Raja Shekar.",
    author: {
      "@type": "Person",
      name: profile.name,
    },
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)] font-sans antialiased selection:bg-[var(--fg)] selection:text-[var(--bg)]">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--fg)] focus:text-[var(--bg)] focus:rounded-md focus:font-mono focus:text-xs"
        >
          Skip to content
        </a>

        {/* DevTools HTML comment easter egg */}
        <div
          dangerouslySetInnerHTML={{
            __html: `<!-- ${COPY.egg.htmlComment} -->`,
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Fixed particle canvas — behind everything (z-index: 0) */}
          <ParticleCanvas />

          {/* Smooth Momentum Scroll with Lenis */}
          <SmoothScroll>
            {/* Top-docked Notch Navigation */}
            <NotchNav
              bookingUrl={config.bookingUrl}
              statusText={profile.statusText}
              enableSpotify={config.featureFlags?.spotifyNowPlaying !== false}
            />

            {/* Main page content area */}
            <MainShell>{children}</MainShell>
          </SmoothScroll>

          {/* Global Styled Plain-Text LLMS.TXT Modal */}
          <LlmsModal />
        </ThemeProvider>

        {/* Google Analytics (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
