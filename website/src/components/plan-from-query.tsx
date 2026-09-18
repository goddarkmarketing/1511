"use client";

import { useSearchParams } from "next/navigation";
import { PlanSection } from "@/components/plan-section";
import type { Locale } from "@/lib/i18n";
import type { BoatId } from "@/lib/pricing";

export function PlanFromQuery({
  locale,
  standalone = false,
}: {
  locale: Locale;
  standalone?: boolean;
}) {
  const searchParams = useSearchParams();
  const experience = searchParams.get("experience") ?? undefined;
  const boatParam = searchParams.get("boat");
  const initialBoat: BoatId | undefined =
    boatParam === "longtail" ? "longtail" : undefined;

  return (
    <PlanSection
      locale={locale}
      standalone={standalone}
      initialExperience={experience}
      initialBoat={initialBoat}
    />
  );
}
