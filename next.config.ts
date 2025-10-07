// next.config.ts
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Por si Next lo respeta en tu versión
  experimental: {
    optimizeCss: false,
  },

  // Mantén tu fallback de fs y quita el CssMinimizerPlugin de Webpack
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // fallback previo
    config.resolve = config.resolve || {};
    config.resolve.fallback = { ...(config.resolve.fallback || {}), fs: false };

    // ⚠️ El problema: CssMinimizerPlugin (cssnano-simple).
    // Filtramos cualquier minimizer de CSS por nombre del constructor.
    if (config.optimization?.minimizer) {
      config.optimization.minimizer = config.optimization.minimizer.filter(
        (plugin: any) => {
          const name = plugin?.constructor?.name ?? "";
          // Con Next 15 suele ser "CssMinimizerPlugin"
          return name !== "CssMinimizerPlugin";
        }
      );
    }

    return config;
  },

  // Si quieres también quitar minificación JS (no necesario para el error)
  // minify: false,
};

export default withNextIntl(nextConfig);