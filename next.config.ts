import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
    additionalData: `@use "@/shared/styles/variables" as *;`,
  },
};

export default nextConfig;
