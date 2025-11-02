import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otimizações para produção
  poweredByHeader: false,
  compress: true,

  // Configurações de imagens
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },

  // Configurações experimentais
  experimental: {
    optimizeCss: true,
  },

  // Otimização de output (removido standalone para Vercel)
  // output: 'standalone',
};

export default nextConfig;
