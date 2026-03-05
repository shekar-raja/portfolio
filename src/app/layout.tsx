import type { Metadata } from "next";
import "./globals.css";
import portfolioConfig from "@/data/portfolio.config";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import BlackholeBackground from "@/components/BlackholeBackground";
import SpaceBackground from "@/components/SpaceBackground";
import Script from "next/script";

const { personal } = portfolioConfig;

export const metadata: Metadata = {
  title: `${personal.name} — ${personal.title}`,
  description: personal.description,
  openGraph: {
    title: `${personal.name} — ${personal.title}`,
    description: personal.description,
    url: personal.siteUrl,
    siteName: personal.name,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="noise">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Sora:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/portfolio/images/favicon.png" />
      </head>
      <body>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${personal.googleAnalytics}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${personal.googleAnalytics}');
          `}
        </Script>
        <BlackholeBackground />
        <SpaceBackground />
        <Cursor />
        <SmoothScroll />
        <Nav />
        {children}
      </body>
    </html>
  );
}
