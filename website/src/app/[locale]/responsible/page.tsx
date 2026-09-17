import type { Metadata } from "next";
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
    title: dict.meta.responsible.title,
    description: dict.meta.responsible.description,
    alternates: pageAlternates(locale, "/responsible"),
  };
}

export default async function ResponsiblePage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const { responsibleGuidelines } = getContent(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.pages.responsible.eyebrow}
        title={dict.pages.responsible.title}
        description={dict.pages.responsible.description}
        image={heroImages.responsible}
      />

      <section className="bg-[var(--ivory)] py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {responsibleGuidelines.map((item) => (
              <div key={item.title} className="border-t border-[var(--mocha)] pt-5">
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--charcoal)]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--charcoal-soft)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 border border-[var(--sand-line)] bg-[var(--cream)] p-8 md:p-10">
            <h2 className="font-[family-name:var(--font-display)] text-3xl">
              {dict.pages.responsible.whyTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--charcoal-soft)]">
              {dict.pages.responsible.whyBody}
            </p>
            <HoverButton href={href(locale, "/plan")} className="mt-8">
              {dict.buttons.planResponsibleDay}
            </HoverButton>
          </div>
        </div>
      </section>
    </>
  );
}
