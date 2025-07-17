#!/usr/bin/env node

const requiredVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET', 
  'NEXTAUTH_URL',
  'DEEPSEEK_API_KEY'
];

console.log('🔍 Verificando variables de entorno...\n');

let allGood = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`❌ ${varName}: NO DEFINIDA`);
    allGood = false;
  } else {
    const preview = varName.includes('SECRET') || varName.includes('KEY') 
      ? '***'
      : value.length > 50 
        ? value.substring(0, 50) + '...'
        : value;
    console.log(`✅ ${varName}: ${preview}`);
  }
});

if (allGood) {
  console.log('\n🎉 Todas las variables de entorno están configuradas correctamente');
  process.exit(0);
} else {
  console.log('\n❌ Faltan variables de entorno. Ejecuta: npm run setup');
  process.exit(1);
}
