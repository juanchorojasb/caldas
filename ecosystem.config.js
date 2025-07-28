module.exports = {
  apps: [
    {
      name: 'caldas',
      script: 'npm',
      args: 'start',
      cwd: '/root/caldas',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      error_file: '/root/caldas/logs/err.log',
      out_file: '/root/caldas/logs/out.log',
      log_file: '/root/caldas/logs/combined.log',
      time: true
    }
  ]
};
