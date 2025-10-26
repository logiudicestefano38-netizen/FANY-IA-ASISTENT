import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState } from "react";
const Avatar = () => {
  const [url, setUrl] = useState("/asset_fany_avatar.png");
  const [name, setName] = useState("Fany IA Asistent");
  const [desc, setDesc] = useState("Avatar 3D con rasgos humanos, cabello morado y ojos brillantes.");
  const initialVoiceId = typeof localStorage !== "undefined" ? localStorage.getItem("fanyVoiceId") || window.fanyVoiceId || "" : window.fanyVoiceId || "";
  const [voiceId, setVoiceId] = useState(initialVoiceId);
  const defaultVoiceCommand = `Voz femenina, joven (25-30 a\xF1os), acento puertorrique\xF1o urbano/neutro. La pronunciaci\xF3n debe incluir la aspiraci\xF3n de la 's' final y la 'r' final como 'l'.`;
  const initialVoiceCommand = typeof localStorage !== "undefined" && localStorage.getItem("fanyVoiceCommand") || window.fanyVoiceCommand || defaultVoiceCommand;
  const [voiceCommand, setVoiceCommand] = useState(initialVoiceCommand);
  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const uploadedUrl = await window.websim.upload(file);
      setUrl(uploadedUrl);
    } catch (err) {
      console.error("Upload error", err);
      alert("Error al subir imagen.");
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "card", children: [
    /* @__PURE__ */ jsxDEV("h3", { children: "Avatar" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 27,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "row cols-2", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("img", { src: url, alt: "Avatar Fany", style: { width: "100%", borderRadius: 12, border: "1px solid #eee" } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 30,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", gap: 8, marginTop: 8 }, children: /* @__PURE__ */ jsxDEV("input", { type: "file", accept: "image/*", onChange: onUpload }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 32,
          columnNumber: 13
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 31,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 29,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("label", { children: "Nombre" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 36,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("input", { value: name, onChange: (e) => setName(e.target.value) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 37,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("label", { style: { marginTop: 8 }, children: "Descripci\xF3n visual" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 38,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("textarea", { value: desc, onChange: (e) => setDesc(e.target.value) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 39,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("label", { style: { marginTop: 8 }, children: "ID de voz (ElevenLabs)" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 40,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("input", { value: voiceId, onChange: (e) => setVoiceId(e.target.value), placeholder: "Ej: pNInz6obpgDQGcFmaJgB" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 41,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", gap: 8, marginTop: 8 }, children: [
          /* @__PURE__ */ jsxDEV("button", { onClick: () => {
            window.fanyVoiceId = voiceId;
            try {
              localStorage.setItem("fanyVoiceId", voiceId);
            } catch {
            }
            alert("Voz personalizada activada y guardada.");
          }, children: "Usar mi voz" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 43,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("button", { className: "ghost", onClick: async () => {
            try {
              window.fanyVoiceId = voiceId;
              try {
                localStorage.setItem("fanyVoiceId", voiceId);
              } catch {
              }
              const { speak } = await import("../utils/tts.js");
              await speak("Esta es una prueba con tu voz personalizada.");
            } catch (e) {
              console.error(e);
            }
          }, children: "Probar voz" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 48,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 42,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "small", style: { marginTop: 8 }, children: "Pega aqu\xED el ID de tu voz clonada de ElevenLabs. Se usar\xE1 en todo el sistema y se guardar\xE1 localmente." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 57,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("label", { style: { marginTop: 12 }, children: "Comando de generaci\xF3n de voz" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 61,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("textarea", { value: voiceCommand, onChange: (e) => setVoiceCommand(e.target.value) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 62,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", gap: 8, marginTop: 8 }, children: [
          /* @__PURE__ */ jsxDEV("button", { className: "ghost", onClick: () => {
            window.fanyVoiceCommand = voiceCommand;
            try {
              localStorage.setItem("fanyVoiceCommand", voiceCommand);
            } catch {
            }
            alert("Comando de voz guardado.");
          }, children: "Guardar comando" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 64,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("button", { className: "ghost", onClick: () => {
            setVoiceCommand(defaultVoiceCommand);
          }, children: "Restablecer" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 69,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 63,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "small", style: { marginTop: 8 }, children: "Este comando define el estilo de la voz (edad, acento, tono, timbre y entonaci\xF3n). Se usar\xE1 como referencia para la voz de Fany." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 73,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 35,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 28,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 26,
    columnNumber: 5
  });
};
export {
  Avatar
};
