import type { Metadata } from "next";
import { PingPageContent } from "@/components/ping/ping-page-content";

export const metadata: Metadata = {
  title: "Ping · Anonymous Message",
  description:
    "Send an anonymous message, question, confession, or feedback to Raja Shekar. Zero IP or personal data stored.",
  alternates: {
    canonical: "/ping",
  },
  openGraph: {
    title: "Anonymous Ping · Raja Shekar",
    description:
      "Send me a ping. I won't know it was you. Zero logs, zero personal data stored.",
    url: "https://rshekar.me/ping",
    siteName: "rshekar.me",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://rshekar.me/ping/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Anonymous Ping · Raja Shekar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anonymous Ping · Raja Shekar",
    description:
      "Send me a ping. I won't know it was you. Zero logs, zero personal data stored.",
    images: ["https://rshekar.me/ping/opengraph-image"],
  },
};

export default function PingPage() {
  return <PingPageContent />;
}
