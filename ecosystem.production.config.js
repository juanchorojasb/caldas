module.exports = {
  apps: [{
    name: 'mercadolocal-prod',
    script: 'npm',
    args: 'start',
    cwd: '/root/caldas',
    instances: 1,
    autorestart: true,
    env_file: '.env.local',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/prod-err.log',
    out_file: './logs/prod-out.log',
    log_file: './logs/prod-combined.log',
    time: true
  }]
}
