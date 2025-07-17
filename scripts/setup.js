#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 Configurando Academia Mercado Local Caldas...\n');

// Configuraciones por ambiente
const environments = {
  development: {
    DATABASE_URL: 'postgresql://mercado_user:mercado_password@localhost:5432/mercado_local_db',
    NEXTAUTH_URL: 'http://localhost:3000',
    NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
    NODE_ENV: 'development',
    DEBUG: 'true',
    LOG_LEVEL: 'debug'
  },
  production: {
    DATABASE_URL: 'mysql://u270132579_mercado_user:TU_PASSWORD_AQUI@localhost:3306/u270132579_mercado_local',
    NEXTAUTH_URL: 'https://caldas.mercadolocal.co',
    NEXT_PUBLIC_APP_URL: 'https://caldas.mercadolocal.co',
    NODE_ENV: 'production',
    DEBUG: 'false',
    LOG_LEVEL: 'error'
  }
};

// Variables comunes para todos los ambientes
const commonVars = {
  NEXTAUTH_SECRET: crypto.randomBytes(32).toString('hex'),
  DEEPSEEK_API_KEY: 'sk-527c552c674340bbb5b0e9ff8bef9ac7',
  UPLOADTHING_TOKEN: 'eyJhcGlLZXkiOiJza19saXZlXzdkYzE4Mjg3MDExNDk2MzU4NmFjMmNmNDI0MTM3OWUwZDExY2FmNWM3YWRlNzQ4ODk0M2IyYjJjZDRjYjcwZGUiLCJhcHBJZCI6ImNhaGR0OXNidjUiLCJyZWdpb25zIjpbInNlYTEiXX0='
};

// Función para crear archivo .env sin problemas de codificación
function createEnvFile(filename, variables) {
  const content = Object.entries(variables)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n') + '\n';
  
  // Escribir con codificación UTF-8 explícita
  fs.writeFileSync(filename, content, { encoding: 'utf8' });
  console.log(`✅ Creado: ${filename}`);
}

// Función para verificar y crear directorios
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Creado directorio: ${dirPath}`);
  }
}

// Crear directorios necesarios
ensureDirectoryExists('scripts');
ensureDirectoryExists('logs');

// Crear archivos de configuración para cada ambiente
Object.entries(environments).forEach(([env, envVars]) => {
  const filename = env === 'development' ? '.env.development' : '.env.production';
  const variables = { ...commonVars, ...envVars };
  createEnvFile(filename, variables);
});

// Crear .env por defecto apuntando a development
const defaultEnv = { ...commonVars, ...environments.development };
createEnvFile('.env', defaultEnv);

// Crear .env.local (alta prioridad para desarrollo)
createEnvFile('.env.local', defaultEnv);

// Crear script de inicialización de base de datos
const initDbScript = `-- Inicialización de base de datos para Academia Mercado Local Caldas
-- Este script se ejecuta automáticamente cuando se crea el contenedor PostgreSQL

-- Configurar timezone
SET timezone = 'America/Bogota';

-- Configurar encoding
SET client_encoding = 'UTF8';

-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Configuraciones adicionales
ALTER DATABASE mercado_local_db SET timezone TO 'America/Bogota';

-- Log de inicialización
SELECT 'Base de datos Academia Mercado Local Caldas inicializada correctamente' as mensaje,
       now() as timestamp;
`;

fs.writeFileSync('scripts/init-db.sql', initDbScript, { encoding: 'utf8' });
console.log('✅ Creado: scripts/init-db.sql');

// Crear script de verificación de ambiente
const checkEnvScript = `#!/usr/bin/env node

const requiredVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET', 
  'NEXTAUTH_URL',
  'DEEPSEEK_API_KEY'
];

console.log('🔍 Verificando variables de entorno...\\n');

let allGood = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(\`❌ \${varName}: NO DEFINIDA\`);
    allGood = false;
  } else {
    const preview = varName.includes('SECRET') || varName.includes('KEY') 
      ? '***'
      : value.length > 50 
        ? value.substring(0, 50) + '...'
        : value;
    console.log(\`✅ \${varName}: \${preview}\`);
  }
});

if (allGood) {
  console.log('\\n🎉 Todas las variables de entorno están configuradas correctamente');
  process.exit(0);
} else {
  console.log('\\n❌ Faltan variables de entorno. Ejecuta: npm run setup');
  process.exit(1);
}
`;

fs.writeFileSync('scripts/check-env.js', checkEnvScript, { encoding: 'utf8' });
console.log('✅ Creado: scripts/check-env.js');

console.log('\n🎉 Configuración completada exitosamente!');
console.log('\n📋 Próximos pasos:');
console.log('1. npm run dev:db     # Levantar base de datos');
console.log('2. npm run db:setup   # Configurar tablas');
console.log('3. npm run dev        # Iniciar aplicación');

console.log('\n🔧 Comandos disponibles:');
console.log('npm run setup         # Ejecutar este script');
console.log('npm run check-env     # Verificar variables');
console.log('npm run dev:db        # Solo base de datos');
console.log('npm run dev:full      # Base de datos + app');