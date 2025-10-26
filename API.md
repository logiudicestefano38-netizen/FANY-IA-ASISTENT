# 📖 Documentación de API - Fany IA Asistent

## Funciones Globales (`window`)

### Navegación

#### `window.setFanyTab(tabId: string)`
Cambia a una pestaña específica de la aplicación.

**Parámetros:**
- `tabId`: ID de la pestaña a mostrar

**Valores válidos:**
- `'welcome'` - Pantalla de bienvenida
- `'chat'` - Chat principal
- `'history'` - Historial de conversaciones (próximamente)
- `'generators'` - Generación de contenido
- `'avatar'` - Personalización de avatar
- `'knowledge'` - Base de conocimiento

**Ejemplo:**
```javascript
window.setFanyTab('chat');
```

---

### Diagnósticos

#### `window.openFanyDiagnostics()`
Abre la pestaña de chat y ejecuta una suite completa de pruebas de diagnóstico.

**Retorna:** `Promise<void>`

**Comportamiento:**
1. Cambia automáticamente a la pestaña `'chat'`
2. Espera hasta 10 segundos a que el componente Chat esté montado
3. Ejecuta tres pruebas automáticas:
   - Búsqueda de conocimiento (Wikipedia/DuckDuckGo)
   - Razonamiento lógico
   - Respuesta creativa con TTS

**Ejemplo:**
```javascript
await window.openFanyDiagnostics();
```

**Nota:** Esta función debe ejecutarse en la **consola del navegador**, NO en el terminal bash.

---

#### `window.runFanyDiagnostics()`
Ejecuta las pruebas de diagnóstico directamente (requiere que Chat esté montado).

**Retorna:** `Promise<void>`

**Ejemplo:**
```javascript
// Asegúrate de estar en la pestaña de chat primero
window.setFanyTab('chat');
await window.runFanyDiagnostics();
```

---

### Configuración de Voz

#### `window.fanyVoiceId`
ID de la voz utilizada para TTS (Texto a Voz).

**Tipo:** `string`  
**Valor por defecto:** `"Eez11r666YC6NPNQI7Th"`

**Persistencia:** Se guarda automáticamente en `localStorage` con la clave `"fanyVoiceId"`

**Ejemplo:**
```javascript
// Leer el ID actual
console.log(window.fanyVoiceId);

// Cambiar el ID de voz
window.fanyVoiceId = "nuevo-voice-id";
localStorage.setItem("fanyVoiceId", window.fanyVoiceId);
```

---

#### `window.fanyVoiceCommand`
Descripción detallada de las características de la voz para el sistema TTS.

**Tipo:** `string`  
**Valor por defecto:** 
```
"Voz femenina, joven (25-30 años), acento puertorriqueño urbano/neutro. 
La pronunciación debe incluir la aspiración de la 's' final y la 'r' final como 'l'."
```

**Persistencia:** Se guarda automáticamente en `localStorage` con la clave `"fanyVoiceCommand"`

**Ejemplo:**
```javascript
// Personalizar el comando de voz
window.fanyVoiceCommand = "Voz masculina, grave, acento español de España";
localStorage.setItem("fanyVoiceCommand", window.fanyVoiceCommand);
```

---

## API de WebsimSocket

### Conexión

```javascript
const room = new WebsimSocket();
```

### Colecciones

#### `room.collection(name: string)`
Obtiene acceso a una colección de datos persistente.

**Colecciones disponibles:**
- `'kb'` - Base de conocimiento (Knowledge Base)
- Puedes crear colecciones personalizadas

---

### Métodos de Colección

#### `.create(data: object)`
Crea un nuevo elemento en la colección.

**Ejemplo (Base de Conocimiento):**
```javascript
const kb = room.collection('kb');
kb.create({
  title: 'Python Básico',
  content: 'Python es un lenguaje de programación interpretado...'
});
```

---

#### `.getList()`
Obtiene todos los elementos de la colección.

**Retorna:** `Array<object>`

**Ejemplo:**
```javascript
const kb = room.collection('kb');
const items = kb.getList();
console.log(items);
// [{ id: '...', title: '...', content: '...' }, ...]
```

---

#### `.subscribe(callback: function)`
Suscribe un callback para recibir actualizaciones en tiempo real.

**Parámetros:**
- `callback(items: Array)` - Función que se llama cuando la colección cambia

**Ejemplo:**
```javascript
const kb = room.collection('kb');
kb.subscribe((items) => {
  console.log('KB actualizada:', items);
});
```

---

#### `.delete(id: string)`
Elimina un elemento de la colección por su ID.

**Parámetros:**
- `id` - ID del elemento a eliminar

**Ejemplo:**
```javascript
const kb = room.collection('kb');
kb.delete('elemento-id-123');
```

---

## Utilidades de TTS (Text-to-Speech)

### `speak(text: string)`

Convierte texto a voz y lo reproduce.

**Módulo:** `utils/tts.js`

**Parámetros:**
- `text` - Texto a convertir en voz

**Ejemplo:**
```javascript
import { speak } from './utils/tts.js';

speak('Hola, soy Fany. ¿En qué puedo ayudarte?');
```

**Nota:** Usa las configuraciones globales `window.fanyVoiceId` y `window.fanyVoiceCommand`

---

## Utilidades de Búsqueda

### `buscarConComandos(query: string)`

Realiza una búsqueda web con detección de comandos especiales.

**Módulo:** `utils/search.js`

**Parámetros:**
- `query` - Consulta de búsqueda

**Retorna:** 
```typescript
Promise<{
  results: Array<{ title: string, snippet: string, url: string }>,
  command: { tipo: string, accion: string, icono: string } | null,
  fromCache: boolean
}>
```

**Ejemplo:**
```javascript
import { buscarConComandos } from './utils/search.js';

const resultado = await buscarConComandos('qué es el bosón de Higgs');
console.log(resultado.results);
```

---

### `ejecutarComando(query: string)`

Detecta y ejecuta comandos especiales en el texto.

**Módulo:** `utils/search.js`

**Comandos disponibles:**
- `"modo sin filtro"` - Activa/desactiva modo sin restricciones
- `"clima de [lugar]"` - Información del clima
- `"noticias sobre [tema]"` - Búsqueda de noticias

**Retorna:**
```typescript
{
  tipo: string,
  accion: string,
  icono: string
}
```

**Ejemplo:**
```javascript
import { ejecutarComando } from './utils/search.js';

const cmd = ejecutarComando('modo sin filtro');
if (cmd.tipo === 'no_filter') {
  console.log('Modo sin filtro activado');
}
```

---

## API de Conocimiento Externo

### `fetchKnowledgeContext(query: string)`

Obtiene información de fuentes externas (Wikipedia, DuckDuckGo, Open-Meteo).

**Módulo:** `utils/knowledgeApis.js`

**Parámetros:**
- `query` - Consulta para buscar conocimiento

**Retorna:** `Promise<string>` - Contexto formateado con información relevante

**Ejemplo:**
```javascript
import { fetchKnowledgeContext } from './utils/knowledgeApis.js';

const contexto = await fetchKnowledgeContext('cambio climático');
console.log(contexto);
```

---

## API de Razonamiento

### `needsReasoning(query: string)`

Detecta si una consulta requiere razonamiento detallado.

**Módulo:** `utils/reasoning.js`

**Parámetros:**
- `query` - Texto de la consulta

**Retorna:** `boolean`

**Palabras clave detectadas:**
- "explica", "por qué", "cómo funciona", "diferencia entre", "compara"

**Ejemplo:**
```javascript
import { needsReasoning } from './utils/reasoning.js';

if (needsReasoning('explica por qué el cielo es azul')) {
  console.log('Esta consulta requiere razonamiento');
}
```

---

### `reasoningInstruction()`

Genera instrucciones adicionales para el LLM cuando se requiere razonamiento.

**Módulo:** `utils/reasoning.js`

**Retorna:** `string` - Instrucción de sistema para el LLM

**Ejemplo:**
```javascript
import { reasoningInstruction } from './utils/reasoning.js';

const instruction = reasoningInstruction();
// Agrega esto al prompt del sistema
```

---

## Constantes Importantes

### `FANY_SYSTEM_PROMPT_BASE`

**Ubicación:** `src/components/Chat.jsx`

Prompt del sistema que define la personalidad y comportamiento de Fany.

**⚠️ IMPORTANTE:** No modificar la atribución a Stefany en este prompt.

---

## Eventos del Ciclo de Vida

### Montaje de App
```javascript
// Se ejecuta al montar App.jsx
window.setFanyTab = (t) => setTab(t);
```

### Montaje de Chat
```javascript
// Se ejecuta al montar Chat.jsx
window.runFanyDiagnostics = runDiagnostics;
window.openFanyDiagnostics = () => { /* ... */ };
```

### Desmontaje de Chat
```javascript
// Se ejecuta al desmontar Chat.jsx
delete window.runFanyDiagnostics;
delete window.openFanyDiagnostics;
```

---

## LocalStorage

### Claves Utilizadas

| Clave | Tipo | Descripción |
|-------|------|-------------|
| `fanyVoiceId` | string | ID de la voz TTS |
| `fanyVoiceCommand` | string | Descripción de la voz TTS |

**Ejemplo de uso:**
```javascript
// Guardar
localStorage.setItem('fanyVoiceId', 'nuevo-id');

// Leer
const voiceId = localStorage.getItem('fanyVoiceId');

// Eliminar
localStorage.removeItem('fanyVoiceId');
```

---

## Mensajes del Chat

### Formato de Mensaje

```typescript
interface Message {
  role: 'user' | 'ai';
  text: string;
}
```

### Ejemplo de Uso
```javascript
const newMessage = {
  role: 'user',
  text: 'Hola, ¿cómo estás?'
};

setMessages(prevMessages => [...prevMessages, newMessage]);
```

---

## Códigos de Error Comunes

### `"Lo siento, tuve un problema al procesar tu solicitud."`
- El LLM no respondió correctamente
- Verifica la conexión con `window.websim`

### `"La pestaña Chat no está lista para ejecutar diagnósticos"`
- El componente Chat no está montado
- Abre la pestaña de chat primero

### CORS Errors
- Los módulos ESM desde esm.sh no cargan
- Verifica la conexión a internet
- Intenta un servidor diferente

---

## Mejores Prácticas

1. **Siempre verifica que las funciones globales existan antes de usarlas:**
   ```javascript
   if (window.setFanyTab) {
     window.setFanyTab('chat');
   }
   ```

2. **Maneja errores al usar promesas:**
   ```javascript
   try {
     await window.openFanyDiagnostics();
   } catch (error) {
     console.error('Error en diagnósticos:', error);
   }
   ```

3. **Respeta la persistencia de configuraciones:**
   ```javascript
   // Siempre sincroniza con localStorage
   window.fanyVoiceId = nuevoId;
   localStorage.setItem('fanyVoiceId', nuevoId);
   ```

4. **No modifiques `FANY_SYSTEM_PROMPT_BASE` sin coordinación:**
   - La atribución a Stefany es intencional
   - Contacta al propietario antes de cambios significativos

---

**Documentación mantenida por: Stefany Lo giudice**  
**Última actualización: Octubre 2025**
