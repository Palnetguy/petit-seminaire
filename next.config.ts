import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // dashboard photo uploads (resized in the browser to well under this)
    serverActions: { bodySizeLimit: "4mb" },
  },
  turbopack: {
    // the repo root also holds the old Vite app; pin the workspace to this folder
    root: path.resolve(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
