# 🤖 FANY-IA-ASISTENT

[![CI Status](https://github.com/USUARIO/FANY-IA-ASISTENT/workflows/CI%20-%20Build%20and%20Test/badge.svg)](https://github.com/USUARIO/FANY-IA-ASISTENT/actions)
[![Attribution Check](https://github.com/USUARIO/FANY-IA-ASISTENT/workflows/Attribution%20check/badge.svg)](https://github.com/USUARIO/FANY-IA-ASISTENT/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/USUARIO/FANY-IA-ASISTENT)

**UN ASISTENTE VIRTUAL AVANZADO CON IA**

Fany es un asistente virtual de élite creado y configurado por **Stefany Lo giudice** 🏳️‍⚧️, una desarrolladora trans. Este es su primer proyecto y representa un asistente IA con capacidades avanzadas de búsqueda web, razonamiento, y personalización de voz.

## 🚀 Características Principales

- **💬 Chat Inteligente**: Conversación natural con LLM avanzado
- **🔍 Búsqueda Web en Tiempo Real**: Integración con Wikipedia, DuckDuckGo, y más
- **🧠 Razonamiento Avanzado**: Capacidad de explicar y analizar conceptos complejos
- **🗣️ Texto a Voz (TTS)**: Voz personalizada con acento puertorriqueño
- **📚 Base de Conocimiento**: Sistema de memoria persistente
- **✨ Generadores de Contenido**: Herramientas para crear diversos tipos de contenido
- **🔓 Modo Sin Filtro**: Respuestas sin restricciones (con responsabilidad)

## 📦 Inicio Rápido

### Opción 1: Servidor Python Simple
```bash
python3 -m http.server 5173
# Abre http://localhost:5173 en tu navegador
```

### Opción 2: Vite (Recomendado para desarrollo)
```bash
npm install
npm run dev
```

### Opción 3: Live Server
```bash
live-server --port=5173
```

## 🧪 Pruebas de Diagnóstico

Para probar todas las capacidades de Fany, abre la consola del navegador (F12) y ejecuta:

```javascript
window.openFanyDiagnostics()
```

Este comando:
1. Cambia automáticamente a la pestaña de Chat
2. Ejecuta una serie de pruebas que verifican:
   - Búsqueda de conocimiento (Wikipedia/DuckDuckGo)
   - Razonamiento lógico
   - Respuestas creativas

**Nota**: `window.openFanyDiagnostics()` es código JavaScript, NO debe ejecutarse en el terminal bash.

## 🎯 Comandos Especiales del Chat

Escribe estos comandos en el chat para activar funcionalidades especiales:

- `modo sin filtro` - Activa/desactiva el modo sin restricciones
- Cualquier pregunta con palabras clave de búsqueda (qué es, quién es, cómo, dónde, clima, etc.) activará automáticamente la búsqueda web

## 🎨 Personalización

### Configurar Voz
La voz se configura en `main.jsx` y se persiste en `localStorage`:
- **Voice ID**: `Eez11r666YC6NPNQI7Th`
- **Comando de Voz**: Voz femenina joven con acento puertorriqueño

### Modificar el Sistema Prompt
Edita `FANY_SYSTEM_PROMPT_BASE` en `src/components/Chat.jsx` para cambiar la personalidad y comportamiento de Fany.

**⚠️ IMPORTANTE**: Mantén la atribución a Stefany en el prompt del sistema. Es parte integral de la identidad de Fany.

## 🏗️ Estructura del Proyecto

```
FANY-IA-ASISTENT/
├── index.html              # Punto de entrada con import map
├── main.jsx                # Inicialización de React y configs globales
├── src/
│   ├── App.jsx            # Componente principal y navegación
│   └── components/
│       ├── Chat.jsx       # Chat principal con LLM
│       ├── Avatar.jsx     # Personalización de avatar
│       ├── Call.jsx       # Interfaz de llamada de voz
│       ├── Generators.jsx # Generación de contenido
│       └── Knowledge.jsx  # Base de conocimiento
├── utils/
│   ├── tts.js            # Texto a voz
│   ├── search.js         # Búsqueda web y comandos
│   ├── knowledgeApis.js  # APIs de conocimiento externo
│   ├── reasoning.js      # Detección de razonamiento
│   └── weatherIA.js      # Integración de clima
└── styles/               # Estilos CSS modulares
```

## 🛠️ Desarrollo

Para más detalles sobre desarrollo, consulta [CONTRIBUTING.md](./CONTRIBUTING.md).

### Subproyectos TypeScript

El repo incluye dos ejemplos de TypeScript en `mi-proyecto/` y `mi-proyecto-1/`:

```bash
cd mi-proyecto
npm install
npm run dev    # Desarrollo con ts-node
npm run build  # Compilar TypeScript
npm start      # Ejecutar compilado
```

## 📝 Notas Técnicas

- **Import Map**: La app usa importmap ESM desde `esm.sh` (React, React-DOM)
- **WebsimSocket**: API de persistencia para colecciones (KB, historial)
- **LocalStorage**: Persiste configuraciones de voz y preferencias
- **No Build Required**: Funciona directamente con ESM modules

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Respeta la atribución a Stefany en el código
2. Mantén la coherencia del estilo de código
3. Prueba tus cambios con `window.openFanyDiagnostics()`

## 📄 Licencia

Proyecto creado por **Stefany Lo giudice** 🏳️‍⚧️

---

**¿Tienes preguntas?** Abre un issue o inicia el chat con Fany para obtener ayuda.
