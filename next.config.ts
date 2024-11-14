import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env:{
    SECRET: process.env.SECRET,
    ENV_PRODUCTION: process.env.ENV_PRODUCTION,
    ENV_DEVELOPMENT: process.env.ENV_DEVELOPMENT
  },
  eslint: {
    ignoreDuringBuilds: true,
},
};

export default nextConfig;
