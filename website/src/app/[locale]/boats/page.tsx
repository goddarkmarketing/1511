import type { Metadata } from "next";
import Link from "next/link";
import { BoatsSection } from "@/components/boats-section";
import { PageHero } from "@/components/page-hero";
import { HoverButton } from "@/components/ui/hover-button";
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
    title: dict.meta.boats.title,
    description: dict.meta.boats.description,
    alternates: pageAlternates(locale, "/boats"),
  };
}

export default async function BoatsPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const { addOns, experiences, longtailRates } = getContent(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.pages.boats.eyebrow}
        title={dict.pages.boats.title}
        description={dict.pages.boats.description}
        image={heroImages.boats}
      />
      <BoatsSection locale={locale} />

      <section className="bg-[var(--cream)] py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 lg:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
              {dict.pages.boats.speedboatRatesTitle}
            </h2>
            <p className="mt-3 text-sm text-[var(--charcoal-soft)]">
              {dict.pages.boats.speedboatRatesBody}
            </p>
            <div className="mt-6 divide-y divide-[var(--sand-line)] border-y border-[var(--sand-line)]">
              {experiences.map((experience) => (
                <Link
                  key={experience.slug}
                  href={href(locale, `/experiences/${experience.slug}`)}
                  className="flex items-baseline justify-between gap-6 py-4 transition hover:text-[var(--mocha)]"
                >
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-xl">
                      {experience.title}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--charcoal-soft)]">
                      {experience.duration}
                    </p>
                  </div>
                  <p className="shrink-0 text-lg font-medium text-[var(--mocha)]">
                    {dict.labels.thb} {experience.price}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
              {dict.pages.boats.longtailRatesTitle}
            </h2>
            <p className="mt-3 text-sm text-[var(--charcoal-soft)]">
              {dict.pages.boats.longtailRatesBody}
            </p>
            <div className="mt-6 divide-y divide-[var(--sand-line)] border-y border-[var(--sand-line)]">
              {longtailRates.map((rate) => (
                <div
                  key={`${rate.program}-${rate.duration}`}
                  className="flex items-baseline justify-between gap-6 py-4"
                >
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-xl">
                      {rate.program}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--charcoal-soft)]">
                      {rate.duration}
                    </p>
                  </div>
                  <p className="shrink-0 text-lg font-medium text-[var(--mocha)]">
                    {dict.labels.thb} {rate.price}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-[var(--charcoal-soft)]">
              {dict.pages.boats.parkNoteBefore}{" "}
              <Link href={href(locale, "/booking-info")} className="text-[var(--mocha)]">
                {dict.pages.boats.parkNoteLink}
              </Link>{" "}
              {dict.pages.boats.parkNoteAfter}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--ivory)] py-20">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            {dict.pages.boats.addOnsTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-[var(--charcoal-soft)]">
            {dict.pages.boats.addOnsBody}
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {addOns.map((item) => (
              <div
                key={item.id}
                className="border border-[var(--sand-line)] bg-[var(--cream)] p-6"
              >
                <p className="font-[family-name:var(--font-display)] text-2xl">
                  {item.name}
                </p>
                <p className="mt-2 text-[var(--mocha)]">
                  {dict.labels.from} {dict.labels.thb} {item.price}
                </p>
                <p className="mt-3 text-sm text-[var(--charcoal-soft)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <HoverButton href={href(locale, "/plan")}>
              {dict.buttons.buildYourDay}
            </HoverButton>
            <HoverButton href={href(locale, "/transfers")} variant="dark">
              {dict.buttons.privateTransfers}
            </HoverButton>
          </div>
        </div>
      </section>
    </>
  );
}
