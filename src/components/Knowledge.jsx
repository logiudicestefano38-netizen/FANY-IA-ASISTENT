import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useMemo, useState } from "react";
const room = new WebsimSocket();
const Knowledge = () => {
  const kbList = React.useSyncExternalStore(
    room.collection("kb").subscribe,
    room.collection("kb").getList
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return kbList;
    return kbList.filter(
      (k) => (k.title || "").toLowerCase().includes(q) || (k.content || "").toLowerCase().includes(q)
    );
  }, [kbList, search]);
  const add = async () => {
    const t = title.trim(), c = content.trim();
    if (!t || !c) return;
    await room.collection("kb").create({ title: t, content: c });
    setTitle("");
    setContent("");
  };
  const remove = async (id) => {
    try {
      await room.collection("kb").delete(id);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "card", children: [
    /* @__PURE__ */ jsxDEV("h3", { children: "Base de conocimiento" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 36,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "row cols-2", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("input", { placeholder: "T\xEDtulo", value: title, onChange: (e) => setTitle(e.target.value) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 39,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("textarea", { placeholder: "Contenido, hechos, procedimientos, enlaces...", value: content, onChange: (e) => setContent(e.target.value) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 40,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", gap: 8, marginTop: 8 }, children: [
          /* @__PURE__ */ jsxDEV("button", { onClick: add, children: "A\xF1adir" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 42,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("button", { className: "ghost", onClick: () => {
            setTitle("");
            setContent("");
          }, children: "Limpiar" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 43,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 41,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "small", style: { marginTop: 8 }, children: "Los registros se guardan de forma persistente y son tuyos. Solo puedes eliminar los que creaste." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 45,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 38,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("input", { placeholder: "Buscar conocimiento...", value: search, onChange: (e) => setSearch(e.target.value) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 50,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "list", style: { marginTop: 12 }, children: filtered.slice().reverse().map((k) => /* @__PURE__ */ jsxDEV("div", { className: "item", style: { alignItems: "flex-start" }, children: [
          /* @__PURE__ */ jsxDEV("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ jsxDEV("strong", { children: k.title }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 55,
              columnNumber: 19
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "small", children: [
              "por ",
              k.username,
              " \xB7 ",
              new Date(k.created_at).toLocaleString()
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 56,
              columnNumber: 19
            }),
            /* @__PURE__ */ jsxDEV("div", { style: { marginTop: 6 }, children: k.content }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 57,
              columnNumber: 19
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 54,
            columnNumber: 17
          }),
          /* @__PURE__ */ jsxDEV("button", { className: "ghost", onClick: () => remove(k.id), children: "Eliminar" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 59,
            columnNumber: 17
          })
        ] }, k.id, true, {
          fileName: "<stdin>",
          lineNumber: 53,
          columnNumber: 15
        })) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 51,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 49,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 37,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 35,
    columnNumber: 5
  });
};
export {
  Knowledge
};
