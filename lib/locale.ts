export const locales = ["th", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(v: string): v is Locale {
  return v === "th" || v === "en";
}
