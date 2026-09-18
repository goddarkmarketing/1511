import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutFromQuery } from "@/components/checkout-from-query";
import { PageHero } from "@/components/page-hero";
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
    title: dict.meta.checkout.title,
    description: dict.meta.checkout.description,
    alternates: pageAlternates(locale, "/checkout"),
    robots: { index: false },
  };
}

export default async function CheckoutPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.checkout.eyebrow}
        title={dict.checkout.title}
        description={dict.checkout.description}
        image={heroImages.checkout}
      />
      <Suspense fallback={null}>
        <CheckoutFromQuery locale={locale} />
      </Suspense>
    </>
  );
}
