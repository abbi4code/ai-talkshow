// import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lovely-flamingo-139.convex.cloud"
      },
      {
        protocol: "https",
        hostname: "img.freepik.com"
      }
    ]
  }
};

export default nextConfig;
