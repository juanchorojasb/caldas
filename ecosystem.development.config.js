module.exports = {
  apps: [{
    name: 'mercadolocal-dev',
    script: 'npm',
    args: 'run dev',
    cwd: '/root/caldas',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    error_file: './logs/dev-err.log',
    out_file: './logs/dev-out.log',
    log_file: './logs/dev-combined.log',
    time: true
  }]
}
