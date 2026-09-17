import type { SiteContent } from "@/lib/content/types";
import { pricingConfig } from "@/lib/site-config";

export type Duration = "half" | "full";
export type BoatId = "speedboat" | "longtail";

export type Selection = {
  experienceSlug: string;
  boatId: BoatId;
  guests: number;
  duration: Duration;
  addOnIds: string[];
};

export function toNumber(value: string): number {
  const parsed = Number(value.split("-")[0].replace(/,/g, ""));
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function formatTHB(value: number): string {
  return value.toLocaleString("en-US");
}

/** Full-day Koh Kradan is priced as the full-day package, not the half-day rate. */
function basePrice(content: SiteContent, selection: Selection): number {
  const experience = content.experiences.find(
    (item) => item.slug === selection.experienceSlug,
  );
  if (!experience) return 0;

  if (selection.boatId === "longtail") {
    if (experience.slug === "koh-kradan-escape") {
      return selection.duration === "half" ? 4990 : 5990;
    }
    return toNumber(experience.longtailPrice);
  }

  if (experience.slug === "koh-kradan-escape" && selection.duration === "full") {
    return 13900;
  }

  return toNumber(experience.price);
}

export function priceBreakdown(content: SiteContent, selection: Selection) {
  const base = basePrice(content, selection);

  const extraGuests = Math.max(0, selection.guests - pricingConfig.baseGuests);
  const extraGuestRate =
    selection.boatId === "speedboat"
      ? pricingConfig.extraAdultSpeedboat
      : pricingConfig.extraAdultLongtail;
  const extraGuestTotal = extraGuests * extraGuestRate;

  const addOns = content.addOns
    .filter((item) => selection.addOnIds.includes(item.id))
    .map((item) => ({ ...item, amount: toNumber(item.price) }));
  const addOnTotal = addOns.reduce((sum, item) => sum + item.amount, 0);

  const total = base + extraGuestTotal + addOnTotal;
  const deposit = Math.round(total * pricingConfig.depositRate);

  return {
    base,
    extraGuests,
    extraGuestTotal,
    addOns,
    addOnTotal,
    total,
    deposit,
    remaining: total - deposit,
  };
}

export function selectionToQuery(selection: Selection): string {
  const params = new URLSearchParams({
    experience: selection.experienceSlug,
    boat: selection.boatId,
    guests: String(selection.guests),
    duration: selection.duration,
  });
  if (selection.addOnIds.length > 0) {
    params.set("addons", selection.addOnIds.join(","));
  }
  return params.toString();
}

export function selectionFromParams(
  content: SiteContent,
  params: Record<string, string | string[] | undefined>,
): Selection {
  const read = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const experienceSlug =
    content.experiences.find((item) => item.slug === read("experience"))?.slug ??
    content.experiences[0].slug;

  const boatId: BoatId = read("boat") === "longtail" ? "longtail" : "speedboat";
  const duration: Duration = read("duration") === "full" ? "full" : "half";

  const guestsRaw = Number(read("guests"));
  const guests = Number.isFinite(guestsRaw)
    ? Math.min(Math.max(Math.round(guestsRaw), 1), pricingConfig.maxGuests)
    : 4;

  const addOnIds = (read("addons") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter((id) => content.addOns.some((item) => item.id === id));

  return { experienceSlug, boatId, guests, duration, addOnIds };
}
