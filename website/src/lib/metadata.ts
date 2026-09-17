import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";

/** Per-page canonical plus hreflang links for both locales. */
export function pageAlternates(locale: Locale, path: string): Metadata["alternates"] {
  const clean = path === "/" ? "" : path;
  return {
    canonical: `/${locale}${clean}`,
    languages: Object.fromEntries(locales.map((item) => [item, `/${item}${clean}`])),
  };
}
