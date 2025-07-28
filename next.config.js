/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'utfs.io',
      'uploadthing.com'
    ],
  },
  // Configuración para cross-origin
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://mercadolocal.co',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
