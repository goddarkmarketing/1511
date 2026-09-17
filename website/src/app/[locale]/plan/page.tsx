import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PlanSection } from "@/components/plan-section";
import { getDict } from "@/lib/dict";
import { pageAlternates } from "@/lib/metadata";
import { locales, toLocale } from "@/lib/i18n";
import type { BoatId } from "@/lib/pricing";
import { heroImages } from "@/lib/site-config";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ experience?: string; boat?: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  return {
    title: dict.meta.plan.title,
    description: dict.meta.plan.description,
    alternates: pageAlternates(locale, "/plan"),
  };
}

export default async function PlanPage({ params, searchParams }: Props) {
  const { locale: raw } = await params;
  const { experience, boat } = await searchParams;
  const locale = toLocale(raw);
  const dict = getDict(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.pages.plan.eyebrow}
        title={dict.pages.plan.title}
        description={dict.pages.plan.description}
        image={heroImages.plan}
      />
      <PlanSection
        locale={locale}
        standalone
        initialExperience={experience}
        initialBoat={boat === "longtail" ? ("longtail" as BoatId) : undefined}
      />
    </>
  );
}
