import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Every image in this project is a local asset in /public. AVIF first —
    // it lands ~30% smaller than WebP on the large photographic PNGs the case
    // study and services pages are built from.
    formats: ["image/avif", "image/webp"],
    // Cache optimised variants for a year; the source files are content-stable.
    minimumCacheTTL: 31536000,
  },
  // No Content-Security-Policy here: the Marketing tab lets an admin paste
  // arbitrary <script> snippets (GTM/GA4/Pixel/etc.) straight into <head>/
  // <body> by design — a CSP tight enough to matter would break that same
  // feature, and one loose enough not to would add no real protection.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
