module.exports = {
  apps: [{
    name: 'mercadolocal-staging',
    script: 'npm',
    args: 'run dev',
    cwd: '/root/caldas',
    instances: 1,
    autorestart: true,
    env_file: '.env.local',
    env: {
      NODE_ENV: 'development',
      PORT: 3001
    },
    error_file: './logs/staging-err.log',
    out_file: './logs/staging-out.log',
    log_file: './logs/staging-combined.log',
    time: true
  }]
}
