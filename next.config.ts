import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Photos (placeholders for now) come from Wikimedia Commons; next/image resizes them and serves AVIF/WebP.
    remotePatterns: [
      { protocol: 'https', hostname: 'thumb.wikimedia.org' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
    formats: ['image/avif', 'image/webp'],
    // Transformed images are cached for a month; the sources don't change.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
