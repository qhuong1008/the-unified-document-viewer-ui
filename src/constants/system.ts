export const SOURCE_SYSTEM = {
  SALES: "SALES",
  SERVICE: "SERVICE",
} as const;

export const DOC_CATEGORIES = {
  COMMERCIAL: "Commercial",
  TECHNICAL: "Technical",
  LEGAL: "Legal",
} as const;

export type SourceSystemValue =
  (typeof SOURCE_SYSTEM)[keyof typeof SOURCE_SYSTEM];
