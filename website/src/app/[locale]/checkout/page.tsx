import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";
import { PageHero } from "@/components/page-hero";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/dict";
import { pageAlternates } from "@/lib/metadata";
import { locales, toLocale } from "@/lib/i18n";
import { selectionFromParams } from "@/lib/pricing";
import { heroImages } from "@/lib/site-config";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
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
    title: dict.meta.checkout.title,
    description: dict.meta.checkout.description,
    alternates: pageAlternates(locale, "/checkout"),
    robots: { index: false },
  };
}

export default async function CheckoutPage({ params, searchParams }: Props) {
  const { locale: raw } = await params;
  const query = await searchParams;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const selection = selectionFromParams(getContent(locale), query);

  return (
    <>
      <PageHero
        eyebrow={dict.checkout.eyebrow}
        title={dict.checkout.title}
        description={dict.checkout.description}
        image={heroImages.checkout}
      />
      <CheckoutForm locale={locale} selection={selection} />
    </>
  );
}
