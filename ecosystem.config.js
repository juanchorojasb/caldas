module.exports = {
  apps: [{
    name: 'academia-caldas',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/caldas',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      DATABASE_URL: 'mysql://caldas_user:Caldas2025!MercadoLocal@localhost:3306/mercado_local_caldas',
      NEXTAUTH_URL: 'https://caldas.mercadolocal.co',
      NEXTAUTH_SECRET: 'a8f9d2c7e4b6a1d8f7e3c9b2a5d8f6e2c7b4a9d6f3e8c1b7a4d9f2e5c8b3a6d1f4e7c2b9a5d8f1e6c3b8a2d7f4e9c6b1a8d5f2e7c4b9a3d6f1e8c5b2a7d4',
      DEEPSEEK_API_KEY: 'sk-527c552c674340bbb5b0e9ff8bef9ac7',
      UPLOADTHING_TOKEN: 'eyJhcGlLZXkiOiJza19saXZlXzdkYzE4Mjg3MDExNDk2MzU4NmFjMmNmNDI0MTM3OWUwZDExY2FmNWM3YWRlNzQ4ODk0M2IyYjJjZDRjYjcwZGUiLCJhcHBJZCI6ImNhaGR0OXNidjUiLCJyZWdpb25zIjpbInNlYTEiXX0=',
      NEXT_PUBLIC_APP_URL: 'https://caldas.mercadolocal.co'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
}
