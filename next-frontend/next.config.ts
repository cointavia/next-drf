import type { NextConfig } from "next";
import dotenv from "dotenv";

// Load environment variables from the project-level `.env` file
dotenv.config({ path: "../.env" }); // Adjust path if .env is at project root

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    // Add more environment variables here if needed
  },
};

export default nextConfig;
