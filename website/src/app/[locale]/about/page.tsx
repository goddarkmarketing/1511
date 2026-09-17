import type { Metadata } from "next";
import Image from "next/image";
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
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    alternates: pageAlternates(locale, "/about"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const { philosophies, trustPoints } = getContent(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.pages.about.eyebrow}
        title={dict.pages.about.title}
        description={dict.pages.about.description}
        image={heroImages.about}
      />

      <section className="bg-[var(--ivory)] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 lg:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
              {dict.pages.about.storyTitle}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--charcoal-soft)]">
              {dict.pages.about.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden">
            <Image
              src="/images/hero/sea.jpg"
              alt="Trang Voyage at sea"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-16 md:py-20">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            {dict.pages.about.philosophyTitle}
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {philosophies.map((item) => (
              <div key={item.title}>
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--mocha)]">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--charcoal-soft)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--ivory)] py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--mocha)]">
            {dict.pages.about.trustEyebrow}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            {dict.pages.about.trustTitle}
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map((item) => (
              <div key={item.title} className="border-t border-[var(--mocha)] pt-5">
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--charcoal)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--charcoal-soft)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <HoverButton href={href(locale, "/plan")}>
              {dict.buttons.planYourDay}
            </HoverButton>
            <HoverButton href={href(locale, "/responsible")} variant="dark">
              {dict.buttons.responsibleTourism}
            </HoverButton>
          </div>
        </div>
      </section>
    </>
  );
}
