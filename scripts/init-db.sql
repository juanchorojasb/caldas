-- Inicialización de base de datos para Academia Mercado Local Caldas
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
