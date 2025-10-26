## Repo snapshot

- Primary UI: static `index.html` + `main.jsx` that mounts `src/App.jsx` into the DOM element with id "app".
- React components live in `src/components/` (e.g. `Chat.jsx`, `Generators.jsx`, `Knowledge.jsx`).
- Lightweight client-only app using ESM import map in `index.html` (React from esm.sh). No root `package.json` present — two small subprojects live in `mi-proyecto/` and `mi-proyecto-1/` (both TypeScript examples with `tsc`/`ts-node`).
- Utilities and integrations: `utils/*` contains helper modules (TTS, search, weather). `Chat.jsx` orchestrates LLM calls and search commands.

## What an AI coding agent should know (concise)

1. App entry and mount
   - `index.html` loads `main.jsx` (ESM importmap). `main.jsx` does a createRoot(...).render(App) of `src/App.jsx`.
   - If editing runtime boot, change `main.jsx` and `index.html` together — the import map literal is relied on for external packages.

2. Component responsibilities
   - `src/App.jsx`: top-level router and UI state (tab selection, voice settings, test mode). Keep UI logic here minimal.
   - `src/components/Chat.jsx`: core LLM orchestration. Contains FANY_SYSTEM_PROMPT_BASE, aiRespondLLM(), and integrations with `window.websim` and room collections. Avoid breaking message shape or the system prompt name when editing.
   - `src/components/Generators.jsx` and `Knowledge.jsx`: local generation utilities and a small KB backed by `room.collection("kb")` (WebsimSocket). Prefer adding small features rather than changing storage semantics.

3. Important patterns and conventions
   - Global state via `window` is used for voice settings (e.g. `window.fanyVoiceId`, `window.fanyVoiceCommand`) — persist values using `localStorage` (existing code already reads/writes these keys).
   - Audio playback: TTS is invoked via `utils/tts.js` (`speak()`), but fallbacks exist (audio file `/voz_fany_bienvenida.mp3`). If adding TTS features keep both code paths intact.
   - Search/commands: `utils/search.js` exports `buscarConComandos` / `ejecutarComando` used by Chat to detect commands (e.g., `no_filter` toggle). When altering command names or shapes, update all call sites.
   - Websocket/Room: components use `new WebsimSocket()` and `room.collection(...)` API (subscribe/getList/create/delete). Treat the collection interface as the persistence contract.

4. Build & run (developer workflows)
   - Top-level demo uses static assets — open `index.html` in a dev server that supports ESM modules (example: `vite`, `live-server`, or `python -m http.server`). There is no root `package.json` so no single npm script at repo root.
   - TypeScript subprojects: `mi-proyecto/` and `mi-proyecto-1/` each provide `package.json` with:
     - `npm run dev` → `ts-node src/app.ts`
     - `npm run build` → `tsc`
     - `npm start` → `node dist/app.js`
   - When working on the UI, prefer running a local static server that preserves ESM import maps (or serve via `vite` configured to use the same import map URLs).

5. LLM & command surface to preserve
   - `FANY_SYSTEM_PROMPT_BASE` (in `Chat.jsx`) encodes system-level persona and style. If changing persona, search for that constant and update all references.
   - `aiRespondLLM()` builds `messagesForApi` by combining system prompts, KB items (`room.collection('kb')`), detected command context, and recent history. Keep the message ordering strategy the same (system prompt first, then context, then user history) to preserve LLM behavior.

   IMPORTANT: preserva la atribución del proyecto
   - El `FANY_SYSTEM_PROMPT_BASE` incluye una línea que indica que Fany fue creada y configurada por "Stefany, una desarrolladora trans" y que es su primer proyecto. Esta atribución es una parte intencional del carácter y la historia del asistente.
   - No elimines ni suavices esa frase al editar prompts o al refactorizar `Chat.jsx`. Si necesitas cambiar el tono o el contenido del prompt, coordina con el propietario del repo y conserva la referencia a Stefany y la condición de "primer proyecto".
   - Localización exacta: busca la constante `FANY_SYSTEM_PROMPT_BASE` en `src/components/Chat.jsx`.

6. Examples to reference when coding
   - Toggle no-filter command: `ejecutarComando(trimmed)` in `Chat.jsx` — returns `tipo === "no_filter"` to toggle `noFilterMode`.
   - TTS usage example: `import { speak } from "../utils/tts.js"; speak("Hola...");` in `App.jsx` and `Chat.jsx`.
   - KB usage example: `room.collection("kb").create({ title, content })` and `room.collection("kb").getList()` in `Knowledge.jsx`.

7. Safe edits and small proactive improvements
   - Prefer small, localized changes: add a new component under `src/components/` or a new util under `utils/` and wire it into `App.jsx` via the tab list.
   - If changing persisted keys or message formats, add migration code that reads old keys (existing code uses `localStorage.getItem("fanyVoiceId")`) and falls back gracefully.

## When to ask the repo owner

- If you need to change the import map in `index.html` (to update React version or add a package), confirm whether the app is served via a static host or a bundler.
- If you plan to change the WebsimSocket/room persistence API surface, confirm intended server contract (collections shape and methods).

---

If you'd like, I can: (a) add a short CONTRIBUTING snippet with the dev server recommendation (vite config), or (b) extract a small test harness that runs a quick smoke check of Chat's imports. Which would help you most next?
