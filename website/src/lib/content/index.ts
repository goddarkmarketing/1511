import type { Locale } from "@/lib/i18n";
import { en } from "./en";
import { th } from "./th";
import type { SiteContent } from "./types";

const content: Record<Locale, SiteContent> = { en, th };

export function getContent(locale: Locale): SiteContent {
  return content[locale] ?? en;
}

export function getExperience(locale: Locale, slug: string) {
  return getContent(locale).experiences.find((item) => item.slug === slug);
}

export function getBoat(locale: Locale, id: string) {
  return getContent(locale).boats.find((item) => item.id === id);
}

export function getDestination(locale: Locale, slug: string) {
  return getContent(locale).destinations.find((item) => item.slug === slug);
}

export function getJournalPost(locale: Locale, slug: string) {
  return getContent(locale).journalPosts.find((item) => item.slug === slug);
}

export * from "./types";
