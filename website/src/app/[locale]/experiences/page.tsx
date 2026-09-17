import type { Metadata } from "next";
import { ExperiencesSection } from "@/components/experiences-section";
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
    title: dict.meta.experiences.title,
    description: dict.meta.experiences.description,
    alternates: pageAlternates(locale, "/experiences"),
  };
}

export default async function ExperiencesPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const { travelStyles } = getContent(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.pages.experiences.eyebrow}
        title={dict.pages.experiences.title}
        description={dict.pages.experiences.description}
        image={heroImages.experiences}
      />

      <section className="border-b border-[var(--sand-line)] bg-[var(--ivory)]">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-5 py-10 md:grid-cols-5 md:px-8">
          {travelStyles.map((style) => (
            <div key={style.title}>
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--mocha)]">
                {style.title}
              </p>
              <p className="mt-2 text-sm text-[var(--charcoal-soft)]">
                {style.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <ExperiencesSection locale={locale} />

      <section className="bg-[var(--ivory)] py-20 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="flex flex-col items-start justify-between gap-6 border border-[var(--sand-line)] bg-[var(--cream)] p-8 md:flex-row md:items-center md:p-10">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--charcoal)]">
                {dict.pages.experiences.ctaTitle}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[var(--charcoal-soft)]">
                {dict.pages.experiences.ctaBody}
              </p>
            </div>
            <HoverButton href={href(locale, "/plan")}>
              {dict.buttons.planYourDay}
            </HoverButton>
          </div>
        </div>
      </section>
    </>
  );
}
