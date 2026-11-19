import Script from "next/script";

/**
 * Swarm Cursors effect
 * Adapted from Joel Califa's Swarm: https://califa.github.io/swarm-site/
 * Embed script from https://github.com/harshit403-pixel/reveal-cursors
 */
export default function SwarmScript() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.SwarmCursorsConfig = { trigger: "auto", once: "first", delay: 600, label: "Rebuild this page", position: "bottom-right", paths: "/resume" };`,
        }}
      />
      <Script
        src="/swarm-cursors.js"
        strategy="afterInteractive"
        data-trigger="auto"
        data-once="first"
        data-delay="600"
        data-label="Rebuild this page"
        data-position="bottom-right"
        data-paths="/resume"
      />
    </>
  );
}
