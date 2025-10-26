# Contribuir y levantar el entorno local

Este proyecto es una aplicación cliente estática (React vía ESM import map) más dos pequeños subproyectos TypeScript en `mi-proyecto/` y `mi-proyecto-1/`. Aquí tienes instrucciones prácticas para levantar la UI y trabajar en desarrollo.

## Opciones rápidas para servir la UI (elige una)

1) Servidor estático mínimo (rápido, sin dependencias)

```bash
# Desde la raíz del repo
python3 -m http.server 5173
# Abre http://localhost:5173 en tu navegador
```

2) live-server (si lo tienes instalado globalmente)

```bash
live-server --port=5173
```

3) Recomendado: Vite (mejor dev UX, recarga rápida)

Pasos mínimos para usar Vite en la raíz del repo:

```bash
npm init -y
npm install --save-dev vite
# Añade en package.json -> "scripts": { "dev": "vite", "build": "vite build", "preview": "vite preview" }
npm run dev
```

Nota sobre import maps: este proyecto usa un `importmap` literal dentro de `index.html` que referencia módulos en esm.sh. Al usar Vite, deja `index.html` tal cual (no reemplazar el importmap). Vite servirá `index.html` y los módulos ESM; verifica que las URLs externas en el importmap sean accesibles desde tu red.

Ejemplo opcional de `vite.config.js` (raíz) si quieres personalizar el puerto o permitir archivos fuera del root:

```js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    // Permitir acceso a archivos fuera del root si lo necesitas
    fs: { allow: ['.'] }
  },
  build: {
    // No forzamos ningún empaquetado especial; la app es principalmente ESM
    outDir: 'dist'
  }
});
```

Si prefieres no crear un `package.json` en la raíz, usa la opción (1) o (2).

## Trabajar con los subproyectos TypeScript

Hay dos carpetas ejemplo: `mi-proyecto/` y `mi-proyecto-1/`. Cada una incluye su propio `package.json` y scripts:

- `npm install` (primera vez)
- `npm run dev` → arranca con `ts-node src/app.ts` (modo desarrollo)
- `npm run build` → `tsc`
- `npm start` → `node dist/app.js`

Si vas a modificar la lógica de backend/example en esas carpetas, entra en la carpeta correspondiente y ejecuta los scripts ahí.

## Recomendaciones prácticas (específicas del repo)

- No cambiar las rutas ni los nombres de las constantes críticas sin buscar referencias: por ejemplo `FANY_SYSTEM_PROMPT_BASE` en `src/components/Chat.jsx` y las llamadas a `window.websim`.
- Al cambiar la API de persistencia, considera que el frontend usa `new WebsimSocket()` y `room.collection('kb')` con métodos `subscribe`, `getList`, `create`, `delete`.
- Configuraciones de voz: `window.fanyVoiceId` y `window.fanyVoiceCommand` se usan como valores globales y se persisten con `localStorage` — respeta esas claves o añade migración si cambias el nombre.

## Verificación rápida después de levantar la UI

1. Abre el navegador en `http://localhost:5173` (o el puerto que elegiste).
2. Verifica que la app muestre la pantalla de bienvenida y que `Fany IA` cargue.
3. Abre la consola del navegador para ver errores relacionados con CORS o con los módulos en `esm.sh`. Si ves errores de módulo externo, comprueba tu conexión o prueba con el servidor estático.

---

Si quieres, puedo:

- Añadir un `package.json` y un `vite.config.js` de ejemplo en la raíz para que otros no tengan que ejecutar `npm init` manualmente.
- Crear una pequeña tarea npm (`dev`) y un `README.dev.md` con comandos copy-paste.

Indica si prefieres que añada esos archivos (opción segura: crear sólo `package.json` con scripts de dev).
