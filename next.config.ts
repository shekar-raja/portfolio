import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolio",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Dev-only: redirect root → /portfolio so localhost:3000/ works.
  // Must return [] in production — static export errors if redirects are non-empty.
  async redirects() {
    if (process.env.NODE_ENV === "production") return [];
    return [
      {
        source: "/",
        destination: "/portfolio",
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
