// next.config.ts
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Evita cssnano-simple (minificador de CSS de Next)
  experimental: {
    optimizeCss: false,
  },

  // Ya usas Tailwind v4; no necesitamos nada especial aquí.
  // Mantén SWC para JS/TS (minify por defecto).
  // webpack tweak que ya tenías (fs false) se conserva:
  webpack: (config: any) => {
    config.resolve = config.resolve || {};
    config.resolve.fallback = { ...(config.resolve.fallback || {}), fs: false };
    return config;
  },
};

export default withNextIntl(nextConfig);