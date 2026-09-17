import type { Locale } from "@/lib/i18n";
import { en, type Dict } from "./en";
import { th } from "./th";

const dictionaries: Record<Locale, Dict> = { en, th };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? en;
}

export type { Dict };
