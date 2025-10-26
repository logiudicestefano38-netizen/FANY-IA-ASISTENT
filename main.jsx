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
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 13,
  columnNumber: 51
}));
