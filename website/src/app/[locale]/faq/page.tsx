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
    title: dict.meta.faq.title,
    description: dict.meta.faq.description,
    alternates: pageAlternates(locale, "/faq"),
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const { faqs } = getContent(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.pages.faq.eyebrow}
        title={dict.pages.faq.title}
        description={dict.pages.faq.description}
        image={heroImages.faq}
      />
      <section className="bg-[var(--ivory)] py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-4 px-5 md:px-8">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group border border-[var(--sand-line)] bg-[var(--cream)] p-5 open:bg-[var(--ivory)]"
            >
              <summary className="cursor-pointer list-none font-[family-name:var(--font-display)] text-xl">
                {item.q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--charcoal-soft)]">
                {item.a}
              </p>
            </details>
          ))}
          <div className="pt-8">
            <HoverButton href={href(locale, "/contact")}>
              {dict.buttons.stillQuestions}
            </HoverButton>
          </div>
        </div>
      </section>
    </>
  );
}
