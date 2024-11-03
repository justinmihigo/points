import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env:{
    SECRET: process.env.SECRET
  },
  eslint: {
    ignoreDuringBuilds: true,
},
};

export default nextConfig;
