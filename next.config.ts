import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
