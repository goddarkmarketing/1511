import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/dict";
import { pageAlternates } from "@/lib/metadata";
import { href, locales, toLocale } from "@/lib/i18n";
import { heroImages } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  return {
    title: dict.meta.destinations.title,
    description: dict.meta.destinations.description,
    alternates: pageAlternates(locale, "/destinations"),
  };
}

export default async function DestinationsPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const { destinations } = getContent(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.pages.destinations.eyebrow}
        title={dict.pages.destinations.title}
        description={dict.pages.destinations.description}
        image={heroImages.destinations}
      />

      <section className="bg-[var(--cream)] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-5 sm:grid-cols-2 lg:grid-cols-3 md:px-8">
          {destinations.map((destination) => (
            <Link
              key={destination.slug}
              href={href(locale, `/destinations/${destination.slug}`)}
              className="group overflow-hidden bg-[var(--ivory)]"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  sizes="33vw"
                />
              </div>
              <div className="p-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl">
                  {destination.name}
                </h2>
                <p className="mt-2 text-sm text-[var(--charcoal-soft)]">
                  {destination.blurb}
                </p>
                <p className="mt-4 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--mocha)]">
                  {dict.labels.viewDestination}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
