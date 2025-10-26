import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState } from "react";
import { speak } from "../utils/tts.js";
const makeAudioAssetBlock = (name, textOrDesc, tts = true, duration = 1) => {
  const fname = `${name}.mp3`;
  const isTTS = tts ? "true" : "false";
  return `${fname}
\`\`
description: "${textOrDesc.replace(/"/g, '\\"')}"
${tts ? "" : `duration_seconds: ${duration},`}
tts: ${isTTS}
\`\``.replace(/\n\n/, "\n");
};
const Generators = () => {
  const [textPrompt, setTextPrompt] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [audioText, setAudioText] = useState("Hola, soy Fany. Estoy aqu\xED para ayudarte.");
  const [audioAsset, setAudioAsset] = useState("");
  const genText = () => {
    const p = textPrompt.trim();
    if (!p) return;
    const result = `T\xEDtulo: ${p}

Introducci\xF3n:
${p} \u2014 En este art\xEDculo exploramos ideas clave y ejemplos pr\xE1cticos.

Desarrollo:
1) Contexto
2) Detalle
3) Conclusiones

Cierre:
Gracias por leer.`;
    setTextOutput(result);
  };
  const genAudioAsset = () => {
    setAudioAsset(makeAudioAssetBlock("voz_fany_intro", audioText, true));
    speak(audioText);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "row cols-2", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "card", children: [
      /* @__PURE__ */ jsxDEV("h3", { children: "Generaci\xF3n de texto" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 36,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("input", { placeholder: "Tema / prompt", value: textPrompt, onChange: (e) => setTextPrompt(e.target.value) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 37,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", gap: 8, marginTop: 8 }, children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: genText, children: "Generar" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 39,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("button", { className: "ghost", onClick: () => {
          setTextPrompt("");
          setTextOutput("");
        }, children: "Limpiar" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 40,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 38,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("textarea", { style: { marginTop: 8 }, value: textOutput, readOnly: true }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 42,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 35,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "card", children: [
      /* @__PURE__ */ jsxDEV("h3", { children: "Generaci\xF3n de audio (voz Fany)" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 46,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("input", { value: audioText, onChange: (e) => setAudioText(e.target.value) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 47,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", gap: 8, marginTop: 8 }, children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: genAudioAsset, children: "Crear asset + Escuchar" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 49,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("button", { className: "ghost", onClick: () => setAudioAsset(""), children: "Limpiar" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 50,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 48,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("textarea", { style: { marginTop: 8 }, value: audioAsset, readOnly: true }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 52,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "small", style: { marginTop: 8 }, children: "La reproducci\xF3n usa s\xEDntesis local; el asset block permite generar un archivo .mp3." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 53,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 45,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 34,
    columnNumber: 5
  });
};
export {
  Generators
};
