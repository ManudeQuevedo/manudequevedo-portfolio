// src/lib/company.ts
import { COMPANY_META } from "@/data/companyMeta";

export function getCompanyLogoById(id?: string) {
  if (!id) return "/placeholder.svg";
  return COMPANY_META[id]?.logoUrl ?? "/placeholder.svg";
}