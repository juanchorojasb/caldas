module.exports = {
  apps: [{
    name: 'mercadolocal-dev',
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
    error_file: './logs/dev-err.log',
    out_file: './logs/dev-out.log',
    time: true
  }]
}
