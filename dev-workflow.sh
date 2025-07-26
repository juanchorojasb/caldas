#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

dev_small() {
    echo -e "${BLUE}🔧 FLUJO: Cambio pequeño${NC}"
    ./backup-and-restore.sh backup
    echo -e "${GREEN}✅ Backup creado. Ahora:${NC}"
    echo "1. Haz tus cambios"
    echo "2. git add . && git commit -m 'mensaje' && git push"
    echo "3. pm2 restart mercadolocal-dev"
}

dev_feature() {
    if [ -z "$1" ]; then
        echo -e "${RED}❌ Uso: $0 feature nombre-feature${NC}"
        return 1
    fi
    
    echo -e "${BLUE}🏗️ FLUJO: Feature nueva - $1${NC}"
    ./backup-and-restore.sh backup
    git checkout -b feature/$1
    echo -e "${GREEN}✅ Rama feature/$1 creada.${NC}"
    echo "Desarrolla y haz commits regulares con: git add . && git commit -m 'checkpoint: descripción'"
}

deploy_feature() {
    CURRENT_BRANCH=$(git branch --show-current)
    echo -e "${BLUE}🚀 FLUJO: Deploy de feature ($CURRENT_BRANCH)${NC}"
    
    if [[ $CURRENT_BRANCH != feature/* ]]; then
        echo -e "${RED}❌ No estás en una rama feature/${NC}"
        return 1
    fi
    
    git checkout development
    git merge $CURRENT_BRANCH --no-ff
    git push origin development
    ./deploy.sh
    echo -e "${GREEN}✅ Feature deployada y mergeada${NC}"
}

deploy_direct() {
    echo -e "${BLUE}🚀 FLUJO: Deploy directo${NC}"
    git push origin development
    ./deploy.sh
}

emergency_rollback() {
    echo -e "${YELLOW}🚨 FLUJO: Rollback de emergencia${NC}"
    echo "📁 Últimos backups disponibles:"
    ls -la backup_*.tar.gz | tail -5 2>/dev/null || echo "No hay backups"
    echo ""
    echo -e "${YELLOW}Ejecuta: ./backup-and-restore.sh restore [archivo]${NC}"
}

status_check() {
    echo -e "${BLUE}📊 Estado del sistema:${NC}"
    echo ""
    echo "🔧 Git:"
    git status --short
    echo ""
    echo "🔧 PM2:"
    pm2 status
    echo ""
    echo "🔧 Backups recientes:"
    ls -la backup_*.tar.gz | tail -3 2>/dev/null || echo "No hay backups"
}

case "$1" in
    small) 
        dev_small 
        ;;
    feature) 
        dev_feature $2 
        ;;
    deploy-feature) 
        deploy_feature 
        ;;
    deploy) 
        deploy_direct 
        ;;
    rollback) 
        emergency_rollback 
        ;;
    status) 
        status_check 
        ;;
    *) 
        echo -e "${BLUE}📚 Workflow de Desarrollo Híbrido${NC}"
        echo ""
        echo "Comandos:"
        echo "  $0 small              # Cambio pequeño (botón, color, texto)"
        echo "  $0 feature NOMBRE     # Feature nueva (tiendas, pagos, etc)"
        echo "  $0 deploy             # Deploy directo (cambios en development)"
        echo "  $0 deploy-feature     # Deploy de feature (merge + deploy)"
        echo "  $0 rollback           # Rollback de emergencia"
        echo "  $0 status             # Ver estado del sistema"
        echo ""
        echo "Ejemplos:"
        echo "  $0 small                    # Arreglar botón"
        echo "  $0 feature store-system     # Nueva feature de tiendas"
        echo "  $0 deploy-feature           # Subir feature terminada"
        ;;
esac
