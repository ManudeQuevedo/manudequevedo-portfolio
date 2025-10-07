// src/data/companyMeta.ts
export const COMPANY_META: Record<
  string,
  { logoUrl: string; brand?: string }
> = {
  tcs: { logoUrl: "/tcs.png", brand: "TCS" },
  concentrix: { logoUrl: "/concentrix.png", brand: "Concentrix" },
  quiubas: { logoUrl: "/quiubas.png", brand: "Quiubas" },
  linio: { logoUrl: "/linio.png", brand: "Linio" },
};