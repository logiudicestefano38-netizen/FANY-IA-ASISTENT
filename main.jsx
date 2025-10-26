import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./src/App.jsx";
window.fanyVoiceId = "Eez11r666YC6NPNQI7Th";
try {
  localStorage.setItem("fanyVoiceId", window.fanyVoiceId);
} catch {
}
window.fanyVoiceCommand = "Voz femenina, joven (25-30 a\xF1os), acento puertorrique\xF1o urbano/neutro. La pronunciaci\xF3n debe incluir la aspiraci\xF3n de la 's' final y la 'r' final como 'l'.";
try {
  localStorage.setItem("fanyVoiceCommand", window.fanyVoiceCommand);
} catch {
}
// Helper global: abre la pestaña 'chat' y espera hasta que `window.runFanyDiagnostics` esté disponible.
window.openFanyDiagnostics = async function openFanyDiagnostics() {
  try {
    if (window.setFanyTab) window.setFanyTab('chat');
  } catch (e) {}
  const start = Date.now();
  const timeout = 10000; // 10s
  while (!window.runFanyDiagnostics && Date.now() - start < timeout) {
    // espera 300ms y vuelve a comprobar
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 300));
  }
  if (window.runFanyDiagnostics) {
    try {
      window.runFanyDiagnostics();
    } catch (e) {
      console.warn('runFanyDiagnostics failed', e);
      alert('Error al ejecutar diagnósticos. Revisa la consola.');
    }
  } else {
    alert('La pestaña Chat no está lista para ejecutar diagnósticos. Abre la pestaña Chat manualmente y vuelve a intentar.');
  }
};

createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 13,
  columnNumber: 51
}));
