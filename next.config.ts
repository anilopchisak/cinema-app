import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
    additionalData: `@use "@/shared/styles/variables" as *;`,
  },
  env: {
    NEXT_PUBLIC_STRAPI_BASE_URL: process.env.NEXT_PUBLIC_STRAPI_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'front-school.minio.ktsdev.ru',
      },
    ],
  },
};

export default nextConfig;
