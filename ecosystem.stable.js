module.exports = {
  apps: [{
    name: 'caldas-stable',
    script: 'npm',
    args: 'run dev',
    cwd: '/var/www/caldas/caldas',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000,
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    }
  }]
}
