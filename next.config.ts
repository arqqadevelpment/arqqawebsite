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
};

export default nextConfig;
