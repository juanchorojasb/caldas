#!/bin/bash
# Script para restaurar backup

echo "🔄 Restaurando backup de base de datos..."

if [ -z "$1" ]; then
    echo "❌ Uso: ./restore-backup.sh [archivo_backup.sql]"
    echo ""
    echo "📁 Backups disponibles:"
    ls -la ~/backups/mercadolocal/*.sql | tail -5
    exit 1
fi

BACKUP_FILE=$1

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Archivo no encontrado: $BACKUP_FILE"
    exit 1
fi

echo "📋 Restaurando desde: $BACKUP_FILE"
read -p "¿Confirmar restauración? (s/N): " confirm

if [[ $confirm == [sS] ]]; then
    mysql -u root -p mercadolocal < "$BACKUP_FILE"
    echo "✅ Base de datos restaurada"
else
    echo "❌ Restauración cancelada"
fi
