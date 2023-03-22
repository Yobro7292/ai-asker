/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ORG_KEY: process.env.ORG_KEY,
    API_KEY: process.env.API_KEY,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
