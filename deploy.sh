#!/bin/bash

echo "🚀 Iniciando deploy automático..."

# Backup pre-deploy
echo "📦 Creando backup pre-deploy..."
./backup-and-restore.sh backup

# Verificar que estamos en development
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "development" ]; then
    echo "⚠️ Warning: No estás en la rama development (estás en: $BRANCH)"
fi

# Pull cambios (si hay conflictos, parar)
echo "📥 Descargando últimos cambios..."
git pull origin development || {
    echo "❌ Error al hacer git pull. Resuelve conflictos manualmente."
    exit 1
}

# Install dependencies si hay cambios en package.json
if git diff HEAD~1 --name-only | grep -q "package.json"; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Build para verificar que todo compila
echo "🔨 Verificando build..."
npm run build || {
    echo "❌ Error en build. Deploy cancelado."
    exit 1
}

# Restart servers
echo "🔄 Reiniciando servidores..."
pm2 restart mercadolocal-dev

# Verificar que el servidor responde
sleep 5
if curl -f -s http://localhost:3000 > /dev/null; then
    echo "✅ Deploy completado exitosamente"
    echo "🌐 Sitio disponible en: https://mercadolocal.co"
else
    echo "❌ El servidor no responde después del deploy"
    echo "🚨 Considera hacer rollback con: ./dev-workflow.sh rollback"
fi
