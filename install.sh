#!/bin/bash

# 🚀 Script de Instalación Rápida - Fany IA Asistent
# Creado por: Stefany Lo giudice

set -e  # Salir si hay errores

echo "╔════════════════════════════════════════╗"
echo "║   🤖 FANY IA ASISTENT - INSTALACIÓN  ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar Node.js
echo -e "${BLUE}[1/4]${NC} Verificando Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js detectado: $NODE_VERSION"
else
    echo -e "${YELLOW}⚠${NC}  Node.js no detectado. Instalando dependencias opcionales..."
fi

# Verificar npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm detectado: v$NPM_VERSION"
    
    # Instalar dependencias
    echo -e "\n${BLUE}[2/4]${NC} Instalando dependencias..."
    npm install
    echo -e "${GREEN}✓${NC} Dependencias instaladas"
else
    echo -e "${YELLOW}⚠${NC}  npm no detectado. Se usará servidor Python"
fi

# Verificar Python (alternativa)
echo -e "\n${BLUE}[3/4]${NC} Verificando Python..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo -e "${GREEN}✓${NC} Python3 detectado: $PYTHON_VERSION"
else
    echo -e "${YELLOW}⚠${NC}  Python3 no detectado"
fi

# Resumen
echo -e "\n${BLUE}[4/4]${NC} Instalación completada"
echo ""
echo "╔════════════════════════════════════════╗"
echo "║        OPCIONES PARA INICIAR          ║"
echo "╚════════════════════════════════════════╝"
echo ""

if command -v npm &> /dev/null; then
    echo -e "${GREEN}Opción 1 (Recomendada - Vite):${NC}"
    echo "  npm run dev"
    echo ""
fi

if command -v python3 &> /dev/null; then
    echo -e "${GREEN}Opción 2 (Simple - Python):${NC}"
    echo "  npm run serve"
    echo "  # o directamente:"
    echo "  python3 -m http.server 5173"
    echo ""
fi

echo -e "${BLUE}La aplicación estará disponible en:${NC}"
echo "  http://localhost:5173"
echo ""
echo "╔════════════════════════════════════════╗"
echo "║           PRUEBAS RÁPIDAS             ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "1. Abre http://localhost:5173 en tu navegador"
echo "2. Presiona F12 para abrir la consola"
echo "3. Ejecuta: window.openFanyDiagnostics()"
echo ""
echo -e "${GREEN}✨ ¡Listo para usar Fany IA! ✨${NC}"
echo ""
echo "📚 Documentación:"
echo "  - README.md       → Documentación general"
echo "  - QUICKSTART.md   → Guía de inicio rápido"
echo "  - API.md          → Documentación de API"
echo "  - CONTRIBUTING.md → Guía para contribuir"
echo ""
echo "💜 Creado por Stefany Lo giudice"
echo ""
