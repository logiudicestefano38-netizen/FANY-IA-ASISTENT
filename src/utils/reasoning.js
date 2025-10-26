// Helpers to enable light-weight reasoning instructions
export function needsReasoning(query) {
  return /\b(por qu[eé]|razon|explica|justifica|cómo|como|detalle|motivo)\b/i.test(query);
}

export function reasoningInstruction() {
  return `
Cuando sea útil para la precisión, razona brevemente paso a paso y luego entrega la respuesta final claramente etiquetada. Mantén el razonamiento conciso (2-5 frases) y prioriza la exactitud sobre la longitud.
`;
}
