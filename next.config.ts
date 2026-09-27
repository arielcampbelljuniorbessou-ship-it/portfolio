import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.56.1'],
  turbopack: {
    root: process.cwd()
  }
};

export default nextConfig;
