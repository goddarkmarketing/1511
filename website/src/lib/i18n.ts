export const locales = ["en", "th"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "EN",
  th: "TH",
};

export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  th: "th",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function toLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/** Builds a locale-prefixed path: href("th", "/experiences") -> "/th/experiences" */
export function href(locale: Locale, path: string): string {
  if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:")) {
    return path;
  }
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/** Strips the locale prefix from a pathname: "/th/boats" -> "/boats" */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}
