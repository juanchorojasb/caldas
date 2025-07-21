/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['bcryptjs'],
  images: {
    domains: ['localhost']
  }
}

module.exports = nextConfig

