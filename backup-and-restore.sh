#!/bin/bash

# Función para crear backup
backup() {
    DATE=$(date +%Y%m%d_%H%M%S)
    BACKUP_DIR="backups/backup_$DATE"
    
    echo "🔄 Creando backup: $BACKUP_DIR"
    mkdir -p $BACKUP_DIR
    
    # Backup del código
    cp -r app/ $BACKUP_DIR/
    cp -r components/ $BACKUP_DIR/ 2>/dev/null || true
    cp -r lib/ $BACKUP_DIR/ 2>/dev/null || true
    cp package.json $BACKUP_DIR/
    cp next.config.js $BACKUP_DIR/
    cp -r prisma/ $BACKUP_DIR/
    cp .env.local $BACKUP_DIR/ 2>/dev/null || true
    cp .env $BACKUP_DIR/ 2>/dev/null || true
    
    # Backup de la base de datos
    echo "📦 Respaldando base de datos..."
    docker exec mercado-mysql mysqldump -u mercado_user -pmercado123 mercado_local > $BACKUP_DIR/database.sql 2>/dev/null || echo "⚠️ Warning: No se pudo respaldar BD"
    
    # Comprimir
    tar -czf "backup_$DATE.tar.gz" -C backups backup_$DATE
    rm -rf $BACKUP_DIR
    
    echo "✅ Backup creado: backup_$DATE.tar.gz ($(du -h backup_$DATE.tar.gz | cut -f1))"
    
    # Mantener solo los últimos 5 backups
    ls -t backup_*.tar.gz | tail -n +6 | xargs rm -f 2>/dev/null || true
}

# Función para restaurar
restore() {
    if [ -z "$1" ]; then
        echo "❌ Uso: ./backup-and-restore.sh restore backup_YYYYMMDD_HHMMSS.tar.gz"
        echo "📁 Backups disponibles:"
        ls -la backup_*.tar.gz 2>/dev/null || echo "No hay backups disponibles"
        return 1
    fi
    
    if [ ! -f "$1" ]; then
        echo "❌ Archivo $1 no encontrado"
        return 1
    fi
    
    echo "🔄 Restaurando desde: $1"
    
    # Parar servidor
    pm2 stop mercadolocal-dev 2>/dev/null || true
    
    # Extraer backup
    tar -xzf $1
    BACKUP_FOLDER=$(tar -tzf $1 | head -1 | cut -f1 -d"/")
    
    # Restaurar código
    cp -r backups/$BACKUP_FOLDER/app/ ./
    cp -r backups/$BACKUP_FOLDER/components/ ./ 2>/dev/null || true
    cp -r backups/$BACKUP_FOLDER/lib/ ./ 2>/dev/null || true
    cp backups/$BACKUP_FOLDER/package.json ./
    cp backups/$BACKUP_FOLDER/next.config.js ./
    cp -r backups/$BACKUP_FOLDER/prisma/ ./
    
    # Restaurar base de datos si existe
    if [ -f "backups/$BACKUP_FOLDER/database.sql" ]; then
        echo "📦 Restaurando base de datos..."
        docker exec -i mercado-mysql mysql -u mercado_user -pmercado123 mercado_local < backups/$BACKUP_FOLDER/database.sql 2>/dev/null || echo "⚠️ Warning: No se pudo restaurar BD"
    fi
    
    # Limpiar
    rm -rf backups/$BACKUP_FOLDER
    
    # Reinstalar dependencias si es necesario
    npm install --silent
    
    # Reiniciar servidor
    pm2 restart mercadolocal-dev
    
    echo "✅ Restauración completada desde $1"
}

# Función para listar backups
list() {
    echo "📁 Backups disponibles:"
    ls -lah backup_*.tar.gz 2>/dev/null || echo "No hay backups disponibles"
}

case "$1" in
    backup)
        backup
        ;;
    restore)
        restore $2
        ;;
    list)
        list
        ;;
    *)
        echo "📚 Uso: $0 {backup|restore backup_file.tar.gz|list}"
        echo ""
        echo "Ejemplos:"
        echo "  $0 backup                    # Crear backup"
        echo "  $0 list                      # Ver backups"
        echo "  $0 restore backup_xxx.tar.gz # Restaurar backup"
        ;;
esac
