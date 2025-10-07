// next.config.ts
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

interface WebpackConfig {
  resolve: {
    fallback: {
      fs: boolean;
      [key: string]: boolean;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

interface NextConfigWithWebpack {
  webpack: (config: WebpackConfig) => WebpackConfig;
}

// 🚫 Desactiva la minificación CSS para evitar el error de cssnano-simple
const nextConfig: NextConfigWithWebpack & NextConfig = {
  experimental: {
    optimizeCss: false, // 👈 Desactiva cssnano (minificador de CSS)
  },
  webpack: (config: WebpackConfig): WebpackConfig => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

// Plugin de internacionalización
const withNextIntl = createNextIntlPlugin();

// Exportación final
export default withNextIntl(nextConfig);