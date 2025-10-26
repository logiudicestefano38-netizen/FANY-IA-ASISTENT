import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState } from "react";
import { Chat } from "./components/Chat.jsx";
import { Generators } from "./components/Generators.jsx";
import { Avatar } from "./components/Avatar.jsx";
import { Knowledge } from "./components/Knowledge.jsx";
const TABS = [
  { id: "chat", label: "\u{1F4AC} Chat Principal" },
  { id: "history", label: "\u{1F4C4} Historial de Chats" },
  // Placeholder for future history feature
  { id: "generators", label: "\u2728 Generaci\xF3n de Contenido" },
  { id: "avatar", label: "\u{1F464} Personalizaci\xF3n de Fany" },
  { id: "knowledge", label: "\u{1F9E0} Base de Conocimiento" }
];
const App = () => {
  const [tab, setTab] = useState("welcome");
  const [language, setLanguage] = useState("es");
  const [menuOpen, setMenuOpen] = useState(false);
  React.useEffect(() => {
    window.setFanyTab = (t) => setTab(t);
  }, []);
  React.useEffect(() => {
    const savedVoiceId = localStorage.getItem("fanyVoiceId");
    const savedVoiceCommand = localStorage.getItem("fanyVoiceCommand");
    if (savedVoiceId) {
      window.fanyVoiceId = savedVoiceId;
    }
    if (savedVoiceCommand) {
      window.fanyVoiceCommand = savedVoiceCommand;
    } else {
      window.fanyVoiceCommand = "Voz femenina, joven (25-30 a\xF1os), acento puertorrique\xF1o urbano/neutro. La pronunciaci\xF3n debe incluir la aspiraci\xF3n de la 's' final y la 'r' final como 'l'.";
      try {
        localStorage.setItem("fanyVoiceCommand", window.fanyVoiceCommand);
      } catch {
      }
    }
    if (savedVoiceId) {
      import("./utils/tts.js").then(({ speak }) => {
        speak("Hola, soy Fany. Tu voz personalizada y estilo est\xE1n activos.");
      }).catch(() => {
        try {
          const audio = new Audio("/voz_fany_bienvenida.mp3");
          audio.play().catch(() => {
          });
          // Clean up audio reference after playback
          audio.onended = () => {
            audio.src = '';
            audio.load();
          };
        } catch {
        }
      });
    }
  }, []);
  const TabComponent = ({ currentTab }) => {
    switch (currentTab) {
      case "chat":
        return /* @__PURE__ */ jsxDEV(Chat, { language }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 52,
          columnNumber: 27
        });
      case "generators":
        return /* @__PURE__ */ jsxDEV(Generators, {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 53,
          columnNumber: 33
        });
      case "avatar":
        return /* @__PURE__ */ jsxDEV(Avatar, {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 54,
          columnNumber: 29
        });
      case "knowledge":
        return /* @__PURE__ */ jsxDEV(Knowledge, {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 55,
          columnNumber: 32
        });
      case "history":
        return /* @__PURE__ */ jsxDEV("div", { className: "card", children: [
          /* @__PURE__ */ jsxDEV("h3", { children: "Historial de Conversaciones" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 56,
            columnNumber: 52
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "small", children: "Esta funci\xF3n estar\xE1 disponible pronto. Vuelve al chat para empezar." }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 56,
            columnNumber: 88
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 56,
          columnNumber: 30
        });
      case "welcome":
        return /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", height: "80vh", flexDirection: "column", gap: 16 }, children: [
          /* @__PURE__ */ jsxDEV("img", { src: "/asset_fany_avatar.png", alt: "Fany IA Logo", style: {
            width: 220,
            height: 220,
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(255,215,0,0.06)",
            border: "6px solid rgba(255,215,0,0.06)"
          } }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 59,
            columnNumber: 11
          }),
          /* @__PURE__ */ jsxDEV("div", { style: { textAlign: "center" }, children: [
            /* @__PURE__ */ jsxDEV("h2", { style: { margin: 0, color: "var(--gold)" }, children: "Fany IA" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 68,
              columnNumber: 13
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "small", style: { marginTop: 8 }, children: "Abre el men\xFA (\u2630) para acceder al Chat y dem\xE1s herramientas." }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 69,
              columnNumber: 13
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 67,
            columnNumber: 11
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 58,
          columnNumber: 9
        });
      default:
        return /* @__PURE__ */ jsxDEV("div", { className: "card", children: [
          /* @__PURE__ */ jsxDEV("h3", { children: "Bienvenido" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 73,
            columnNumber: 45
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "small", children: "Abre el men\xFA para acceder al chat y las dem\xE1s secciones." }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 73,
            columnNumber: 64
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 73,
          columnNumber: 23
        });
    }
  };
  const openExternal = (target) => {
    const map = {
      google: "https://accounts.google.com/signin",
      phone: "https://www.google.com/search?q=sign+in+phone",
      email: "https://accounts.google.com/signup",
      facebook: "https://www.facebook.com/login"
    };
    const url = map[target] || "#";
    window.open(url, "_blank", "noopener");
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "app-layout", children: [
    /* @__PURE__ */ jsxDEV("button", { className: `menu-toggle ${menuOpen ? "open" : ""}`, onClick: () => setMenuOpen((v) => !v), "aria-expanded": menuOpen, title: "Abrir men\xFA", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "dash" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 93,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "dash" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 93,
        columnNumber: 34
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "dash" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 93,
        columnNumber: 59
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 92,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("main", { className: "main-content", children: /* @__PURE__ */ jsxDEV("div", { className: "content-wrapper", children: /* @__PURE__ */ jsxDEV(TabComponent, { currentTab: tab }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 98,
      columnNumber: 13
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 97,
      columnNumber: 9
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 96,
      columnNumber: 7
    }),
    menuOpen && /* @__PURE__ */ jsxDEV("aside", { className: "right-curtain", role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "right-curtain-inner", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "curtain-header", children: [
          /* @__PURE__ */ jsxDEV("h4", { children: "Men\xFA" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 107,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("button", { className: "close-curtain", onClick: () => setMenuOpen(false), children: "\u2715" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 108,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 106,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "curtain-sections", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "menu-section", children: [
            /* @__PURE__ */ jsxDEV("h5", { children: "Secciones" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 113,
              columnNumber: 17
            }),
            TABS.map((t) => /* @__PURE__ */ jsxDEV(
              "button",
              {
                className: `${tab === t.id ? "active" : ""} collapsed-item`,
                onClick: () => {
                  setTab(t.id);
                  setMenuOpen(false);
                },
                children: t.label
              },
              t.id,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 115,
                columnNumber: 19
              }
            ))
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 112,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "menu-section", children: [
            /* @__PURE__ */ jsxDEV("h5", { children: "Idioma" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 126,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", gap: 6 }, children: [
              /* @__PURE__ */ jsxDEV("button", { className: `ghost ${language === "es" ? "active" : ""}`, onClick: () => {
                setLanguage("es");
              }, children: "Espa\xF1ol" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 128,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV("button", { className: `ghost ${language === "en" ? "active" : ""}`, onClick: () => {
                setLanguage("en");
              }, children: "English" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 129,
                columnNumber: 19
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 127,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 125,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "menu-section", children: [
            /* @__PURE__ */ jsxDEV("h5", { children: "Registro" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 134,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "register-grid", children: [
              /* @__PURE__ */ jsxDEV("button", { className: "register-btn", title: "Registrarse con Google", onClick: () => openExternal("google"), children: [
                /* @__PURE__ */ jsxDEV("img", { src: "https://www.gstatic.com/devrel-devsite/prod/v0f3cf6b1b1b1b0f6a3b7a5c8a7f3b9b5/google_logo.png", alt: "Google" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 137,
                  columnNumber: 21
                }),
                "Google"
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 136,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV("button", { className: "register-btn", title: "Registrarse con Tel\xE9fono", onClick: () => openExternal("phone"), children: [
                /* @__PURE__ */ jsxDEV("img", { src: "https://img.icons8.com/ios-filled/50/ffffff/phone.png", alt: "Tel\xE9fono" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 141,
                  columnNumber: 21
                }),
                "Tel\xE9fono"
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 140,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV("button", { className: "register-btn", title: "Registrarse con Correo", onClick: () => openExternal("email"), children: [
                /* @__PURE__ */ jsxDEV("img", { src: "https://img.icons8.com/ios-filled/50/ffffff/new-post.png", alt: "Correo" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 145,
                  columnNumber: 21
                }),
                "Correo"
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 144,
                columnNumber: 19
              }),
              /* @__PURE__ */ jsxDEV("button", { className: "register-btn", title: "Registrarse con Facebook", onClick: () => openExternal("facebook"), children: [
                /* @__PURE__ */ jsxDEV("img", { src: "https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png", alt: "Facebook" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 149,
                  columnNumber: 21
                }),
                "Facebook"
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 148,
                columnNumber: 19
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 135,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "small", style: { marginTop: 8 }, children: "Se abrir\xE1 la p\xE1gina de inicio de sesi\xF3n/registro del proveedor seleccionado." }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 153,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 133,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 111,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 105,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "right-curtain-backdrop", onClick: () => setMenuOpen(false) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 157,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 104,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 90,
    columnNumber: 5
  });
};
export {
  App
};
