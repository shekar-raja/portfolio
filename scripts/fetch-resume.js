#!/usr/bin/env node
/**
 * fetch-resume.js
 *
 * Downloads the resume PDF from Google Drive and saves it to public/resume.pdf
 * before Next.js dev / build starts.
 *
 * - Reads resumeSource from src/data/portfolio.config.ts via regex (no ts-node needed)
 * - Follows redirects (Drive does multiple hops before delivering the file)
 * - Falls back gracefully if the download fails:
 *     • Existing public/resume.pdf is kept as-is
 *     • If no local copy exists, the resume page falls back to the Drive URL at runtime
 * - In CI (GitHub Actions sets CI=true automatically):
 *     • If public/resume.pdf already exists, the download is skipped (avoids double-fetch
 *       when the workflow runs the script explicitly before `npm run build`)
 *
 * Usage (called automatically via npm scripts):
 *   node scripts/fetch-resume.js
 */

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const CONFIG_PATH = path.join(__dirname, "../src/data/portfolio.config.ts");
const OUTPUT_PATH = path.join(__dirname, "../public/resume.pdf");
const MAX_REDIRECTS = 10;

// ── Helpers ──────────────────────────────────────────────────────────────────

function log(emoji, msg) {
  process.stdout.write(`${emoji}  ${msg}\n`);
}

/** Extract resumeSource URL from the TypeScript config file via regex. */
function readResumeSource() {
  const src = fs.readFileSync(CONFIG_PATH, "utf8");
  const match = src.match(/resumeSource\s*:\s*["']([^"']+)["']/);
  if (!match) {
    throw new Error(
      'Could not find `resumeSource` in src/data/portfolio.config.ts.\n' +
      'Make sure the field exists in the `personal` section.'
    );
  }
  return match[1];
}

/** Convert a Google Drive share URL to a direct download URL. */
function toDownloadUrl(shareUrl) {
  const match = shareUrl.match(/\/file\/d\/([^/]+)/);
  if (!match) {
    throw new Error(`Could not extract file ID from Drive URL: ${shareUrl}`);
  }
  return `https://drive.google.com/uc?export=download&id=${match[1]}&confirm=1`;
}

/** Format bytes as a human-readable string. */
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/** Download a URL to a file path, following redirects. Returns bytes written. */
function downloadFile(url, destPath, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > MAX_REDIRECTS) {
      return reject(new Error("Too many redirects"));
    }

    const lib = url.startsWith("https") ? https : http;

    lib
      .get(url, { headers: { "User-Agent": "portfolio-resume-fetcher/1.0" } }, (res) => {
        // Follow redirects
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          res.resume(); // consume and discard response body
          log("↪️ ", `Redirect (${res.statusCode}) → ${res.headers.location}`);
          return resolve(
            downloadFile(res.headers.location, destPath, redirectCount + 1)
          );
        }

        if (res.statusCode !== 200) {
          res.resume();
          return reject(
            new Error(`HTTP ${res.statusCode} ${res.statusMessage}`)
          );
        }

        const contentType = res.headers["content-type"] || "";
        // Drive sometimes returns an HTML confirmation page for large files.
        // A valid PDF response will have content-type application/pdf or octet-stream.
        if (contentType.includes("text/html")) {
          res.resume();
          return reject(
            new Error(
              "Drive returned an HTML page instead of a PDF.\n" +
              "  This usually means the file requires sign-in or the share link is restricted.\n" +
              "  Ensure the file sharing is set to \"Anyone with the link can view\"."
            )
          );
        }

        const tmp = destPath + ".tmp";
        const fileStream = fs.createWriteStream(tmp);
        let bytes = 0;

        res.on("data", (chunk) => {
          bytes += chunk.length;
        });

        res.pipe(fileStream);

        fileStream.on("finish", () => {
          // Atomically replace the final file
          fs.renameSync(tmp, destPath);
          resolve(bytes);
        });

        fileStream.on("error", (err) => {
          fs.unlink(tmp, () => {}); // clean up temp file
          reject(err);
        });

        res.on("error", (err) => {
          fs.unlink(tmp, () => {});
          reject(err);
        });
      })
      .on("error", reject);
  });
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const isCI = process.env.CI === "true";

  log("📄", "Resume PDF fetcher starting…");

  // CI deduplication: if an explicit "Fetch Resume PDF" step already ran before
  // `npm run build`, the file will already be present — skip to save time.
  if (isCI && fs.existsSync(OUTPUT_PATH)) {
    log("⏭️ ", "Running in CI and public/resume.pdf already exists — skipping download.");
    return;
  }

  let resumeSource;
  try {
    resumeSource = readResumeSource();
    log("🔗", `Source URL: ${resumeSource}`);
  } catch (err) {
    log("⚠️ ", `Could not read resumeSource: ${err.message}`);
    log("⚠️ ", "Skipping PDF download — resume links will fall back to Drive URL at runtime.");
    return;
  }

  let downloadUrl;
  try {
    downloadUrl = toDownloadUrl(resumeSource);
    log("⬇️ ", `Downloading from: ${downloadUrl}`);
  } catch (err) {
    log("⚠️ ", `Invalid Drive URL: ${err.message}`);
    return;
  }

  try {
    const bytes = await downloadFile(downloadUrl, OUTPUT_PATH);
    log("✅", `Saved to public/resume.pdf (${formatSize(bytes)})`);
  } catch (err) {
    if (fs.existsSync(OUTPUT_PATH)) {
      log("⚠️ ", `Download failed: ${err.message}`);
      log("♻️ ", "Using existing public/resume.pdf as fallback.");
    } else {
      log("⚠️ ", `Download failed: ${err.message}`);
      log("⚠️ ", "No local PDF available — resume links will fall back to Drive URL at runtime.");
    }
    // Never exit non-zero — don't break the build
  }
}

main();
