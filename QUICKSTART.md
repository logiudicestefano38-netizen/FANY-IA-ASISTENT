# 🚀 Guía de Inicio Rápido para Desarrolladores

## Instalación en 30 segundos

```bash
# 1. Clonar el repositorio
git clone <tu-repo-url>
cd FANY-IA-ASISTENT

# 2. Instalar dependencias (opcional, solo si usas Vite)
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor Vite en http://localhost:5173 |
| `npm run build` | Compila la aplicación para producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run serve` | Servidor Python simple (sin dependencias) |
| `npm run check:attribution` | Verifica la atribución a Stefany en el código |
| `npm run test:diagnostics` | Muestra cómo ejecutar pruebas de diagnóstico |

## 🧪 Probando Fany IA

### 1. Abre la aplicación
```bash
npm run dev
```

### 2. Abre la consola del navegador
Presiona `F12` o `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)

### 3. Ejecuta los diagnósticos
```javascript
window.openFanyDiagnostics()
```

Esto ejecutará automáticamente:
- ✅ Prueba de búsqueda de conocimiento (Wikipedia/DuckDuckGo)
- ✅ Prueba de razonamiento lógico
- ✅ Prueba de respuesta creativa

## 🎯 Funciones Globales Disponibles

### En la Consola del Navegador

```javascript
// Cambiar a una pestaña específica
window.setFanyTab('chat')     // Chat principal
window.setFanyTab('avatar')   // Personalización
window.setFanyTab('knowledge') // Base de conocimiento
window.setFanyTab('generators') // Generadores

// Ejecutar diagnósticos
window.openFanyDiagnostics()

// Configuración de voz
window.fanyVoiceId          // ID de la voz actual
window.fanyVoiceCommand     // Descripción de la voz
```

### En el Chat

Comandos especiales que puedes escribir:

- `modo sin filtro` → Activa/desactiva modo sin restricciones
- Preguntas con palabras clave → Activan búsqueda web automática:
  - `qué es...`
  - `quién es...`
  - `cómo...`
  - `clima de...`
  - `noticias sobre...`

## 📁 Archivos Importantes a Conocer

### Frontend Principal
- **`index.html`** - Punto de entrada con import map ESM
- **`main.jsx`** - Inicialización de React y configuraciones globales
- **`src/App.jsx`** - Componente raíz y navegación

### Componentes Core
- **`src/components/Chat.jsx`** - Chat principal con LLM (⚠️ contiene `FANY_SYSTEM_PROMPT_BASE`)
- **`src/components/Avatar.jsx`** - Personalización del avatar
- **`src/components/Call.jsx`** - Interfaz de llamada de voz
- **`src/components/Generators.jsx`** - Herramientas de generación
- **`src/components/Knowledge.jsx`** - Base de conocimiento

### Utilidades
- **`utils/tts.js`** - Sistema de texto a voz
- **`utils/search.js`** - Búsqueda web y comandos especiales
- **`utils/knowledgeApis.js`** - APIs externas (Wikipedia, DuckDuckGo)
- **`utils/reasoning.js`** - Detección de necesidad de razonamiento
- **`utils/weatherIA.js`** - Integración de clima

## ⚠️ Reglas Importantes

### 1. Atribución a Stefany
**NUNCA** elimines o modifiques estas líneas en `Chat.jsx`:
```javascript
const FANY_SYSTEM_PROMPT_BASE = `
CONTEXTO CRÍTICO DE IDENTIDAD:
Eres Fany IA Asistent, un asistente virtual de élite. 
Fuiste creada y configurada por Stefany, una desarrolladora trans, 
y tu principal lealtad es con ella, quien te considera su primer proyecto.
...
```

### 2. Configuraciones Globales
Estas variables se persisten en `localStorage`:
- `fanyVoiceId`
- `fanyVoiceCommand`

### 3. API de WebsimSocket
La app usa `WebsimSocket` para persistencia:
```javascript
const room = new WebsimSocket();
room.collection('kb').create({ title, content })
room.collection('kb').getList()
room.collection('kb').delete(id)
```

## 🐛 Resolución de Problemas

### "Cannot find module 'vite'"
```bash
npm install
```

### "Port 5173 already in use"
Cambia el puerto en `vite.config.js` o mata el proceso:
```bash
# Linux/Mac
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Los módulos ESM no cargan
Verifica que:
1. Tienes conexión a internet (para esm.sh)
2. El servidor está corriendo
3. No hay errores CORS en la consola

### window.openFanyDiagnostics no funciona
Asegúrate de:
1. Estar en la pestaña correcta del navegador (no en terminal)
2. Haber abierto la aplicación primero
3. Esperar a que React se monte completamente

## 📚 Recursos Adicionales

- [README.md](./README.md) - Documentación completa
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guía de contribución
- [ESM.sh](https://esm.sh/) - CDN de módulos ESM
- [Vite](https://vitejs.dev/) - Build tool

## 🤝 ¿Necesitas Ayuda?

1. Revisa la consola del navegador (F12)
2. Ejecuta `window.openFanyDiagnostics()` para pruebas
3. Abre un issue en GitHub
4. ¡O pregúntale a Fany en el chat!

---

**Creado con 💜 por Stefany Lo giudice**
