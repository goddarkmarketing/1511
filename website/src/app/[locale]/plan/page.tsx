import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { PlanFromQuery } from "@/components/plan-from-query";
import { getDict } from "@/lib/dict";
import { pageAlternates } from "@/lib/metadata";
import { locales, toLocale } from "@/lib/i18n";
import { heroImages } from "@/lib/site-config";

type Props = {
  params: Promise<{ locale: string }>;
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

export default async function PlanPage({ params }: Props) {
  const { locale: raw } = await params;
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
      <Suspense fallback={null}>
        <PlanFromQuery locale={locale} standalone />
      </Suspense>
    </>
  );
}
