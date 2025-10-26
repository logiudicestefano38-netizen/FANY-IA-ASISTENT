# 📝 Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [0.1.0] - 2025-10-26

### ✨ Agregado
- Sistema completo de chat con LLM integrado
- Búsqueda web en tiempo real (Wikipedia, DuckDuckGo, Open-Meteo)
- Sistema de razonamiento avanzado con instrucciones contextuales
- Texto a voz (TTS) con personalización de acento puertorriqueño
- Base de conocimiento persistente con WebsimSocket
- Modo sin filtro para respuestas sin restricciones
- Sistema de diagnósticos (`window.openFanyDiagnostics()`)
- Generadores de contenido
- Personalización de avatar
- Interfaz de llamada de voz
- Caché local para búsquedas web
- Detección automática de comandos especiales
- Integración con clima (Open-Meteo)

### 📚 Documentación
- README.md completo con instrucciones de inicio
- CONTRIBUTING.md con guía de desarrollo
- QUICKSTART.md para desarrolladores
- API.md con documentación completa de la API
- Comentarios inline en código crítico
- Script de verificación de atribución (`scripts/check_attribution.js`)

### 🔧 Configuración
- `package.json` con scripts útiles:
  - `npm run dev` - Servidor de desarrollo Vite
  - `npm run build` - Compilar para producción
  - `npm run preview` - Previsualizar build
  - `npm run serve` - Servidor Python simple
  - `npm run check:attribution` - Verificar atribución
  - `npm run test:diagnostics` - Instrucciones para pruebas
- `vite.config.js` optimizado para el proyecto
- `.gitignore` completo
- Configuración de VS Code (`.vscode/`)
  - `settings.json` con preferencias de editor
  - `extensions.json` con extensiones recomendadas

### 🎨 Interfaz
- Diseño responsivo con tema oscuro elegante
- Menú lateral deslizable (curtain)
- Pestañas de navegación intuitivas
- Burbujas de chat con distinción visual user/AI
- Modo de prueba para debugging
- Indicadores de estado (búsqueda, razonamiento)
- Pantalla de bienvenida con avatar de Fany

### 🧠 Características de IA
- `FANY_SYSTEM_PROMPT_BASE` con personalidad definida
- Memoria conversacional configurable
- Contexto de hasta 10 mensajes anteriores
- Integración de KB en prompts
- Búsqueda automática basada en palabras clave
- Razonamiento forzado opcional
- Respuestas formateadas en Markdown

### 🔐 Seguridad y Privacidad
- Configuraciones almacenadas en `localStorage`
- Modo sin filtro con advertencia clara
- No hay backend, todo es client-side
- Sin recolección de datos personales

### 🎯 Comandos Especiales
- `modo sin filtro` - Toggle modo sin restricciones
- Detección automática de:
  - Búsquedas (qué es, quién es, cómo, dónde)
  - Clima (temperatura, tiempo)
  - Noticias (actualidad, noticias sobre)
  - Razonamiento (explica, por qué)

### 🚀 Rendimiento
- ESM modules desde CDN (esm.sh)
- No build required para desarrollo básico
- Caché de búsquedas web
- Lazy loading de utilidades
- Audio cleanup automático

### 🐛 Conocido
- Los módulos ESM requieren conexión a internet
- El modo sin filtro depende del LLM subyacente
- TTS puede fallar en algunos navegadores (fallback a audio pregrabado)

### 🙏 Créditos
- **Creadora:** Stefany Lo giudice
- **Proyecto:** Primer proyecto de desarrollo
- **Comunidad:** React, Vite, y todos los contribuidores de herramientas open source

---

## Roadmap Futuro

### [0.2.0] - Próximamente
- [ ] Historial de conversaciones persistente
- [ ] Exportar conversaciones (JSON, Markdown, PDF)
- [ ] Temas de color personalizables
- [ ] Soporte multiidioma completo
- [ ] Integración con más APIs de conocimiento
- [ ] Sistema de plugins

### [0.3.0] - En planificación
- [ ] Autenticación de usuarios
- [ ] Sincronización en la nube
- [ ] Colaboración en tiempo real
- [ ] Análisis de sentimiento
- [ ] Generación de imágenes con IA

---

**Formato de versiones:**
- **MAYOR** - Cambios incompatibles con versiones anteriores
- **MENOR** - Nueva funcionalidad compatible con versiones anteriores
- **PARCHE** - Correcciones de bugs compatibles

**Tipos de cambios:**
- `✨ Agregado` - Nueva funcionalidad
- `🔄 Cambiado` - Cambios en funcionalidad existente
- `⚠️ Deprecado` - Funcionalidad que será removida
- `🗑️ Removido` - Funcionalidad removida
- `🐛 Corregido` - Corrección de bugs
- `🔐 Seguridad` - Correcciones de vulnerabilidades
