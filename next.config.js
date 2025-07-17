/** @type {import('next').NextConfig} */

const nextConfig = {
  // Configuración según ambiente
  env: {
    CUSTOM_KEY: process.env.NODE_ENV,
  },
  
  // Variables públicas automáticas
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  
  // Configuración de imágenes
  images: {
    domains: [
      'localhost',
      'caldas.mercadolocal.co',
      'utfs.io', // UploadThing
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
  
  // Configuraciones específicas por ambiente
  ...(process.env.NODE_ENV === 'production' && {
    output: 'standalone',
    poweredByHeader: false,
    generateEtags: false,
    compress: true,
    trailingSlash: false,
    
    // Headers de seguridad para producción
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Referrer-Policy',
              value: 'origin-when-cross-origin',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
          ],
        },
      ];
    },
  }),
  
  // Configuración para desarrollo
  ...(process.env.NODE_ENV === 'development' && {
    // Logging mejorado para desarrollo
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
  }),
  
  // Configuración experimental (actualizada para Next.js 15)
  experimental: {
    // Configuraciones experimentales válidas para Next.js 15
    optimizePackageImports: ['lucide-react'],
    typedRoutes: false,
  },
  
  // ✅ SECCIÓN TURBO REMOVIDA - Era la causa del warning
  // La sección turbo que estaba aquí causaba el error y fue eliminada
  
  // Paquetes externos del servidor (movido de experimental)
  serverExternalPackages: ['@prisma/client'],
  
  // Webpack personalizado
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Configuración específica para Prisma
    if (isServer) {
      config.externals.push({
        '@prisma/client': 'commonjs @prisma/client',
      });
    }
    
    // Configuración específica para desarrollo
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    
    return config;
  },
  
  // Redirecciones automáticas
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/auth/login',
        permanent: true,
      },
      {
        source: '/register',
        destination: '/auth/register',
        permanent: true,
      },
    ];
  },
  
  // Rewrites para API
  async rewrites() {
    return [
      ...(process.env.NODE_ENV === 'development' ? [
        {
          source: '/api/health',
          destination: '/api/health',
        },
      ] : []),
    ];
  },
};

module.exports = nextConfig;