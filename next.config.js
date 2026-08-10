import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["pdf-parse"],
  },
  webpack: (config) => {
    config.resolve.alias["@/context"] = path.resolve(__dirname, "Design System/ui/src/context");
    config.resolve.alias["@/components"] = path.resolve(__dirname, "Design System/ui/src/components");
    config.resolve.alias["@/hooks"] = path.resolve(__dirname, "Design System/ui/src/hooks");
    config.resolve.alias["@/forms"] = path.resolve(__dirname, "Design System/ui/src/forms");
    config.resolve.alias["@/apiServices"] = path.resolve(__dirname, "Design System/ui/src/apiServices");
    return config;
  },
};

export default nextConfig;
