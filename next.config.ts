import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 defaults to qualities: [75] only — allow premium photography tiers.
    qualities: [75, 82, 85, 88, 90, 92],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1672, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512, 640],
  },
};

export default nextConfig;
