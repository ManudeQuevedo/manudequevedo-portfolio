// Normaliza una clave a slug seguro: sin puntos, espacios, símbolos.
// "llm.report" -> "llm_report", "UI Kit" -> "ui_kit"
export const safeKey = (s: string) =>
  (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");