import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { TestimonialsSection } from "@/components/testimonials-section";
import { HoverButton } from "@/components/ui/hover-button";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/dict";
import { pageAlternates } from "@/lib/metadata";
import { href, locales, toLocale } from "@/lib/i18n";
import { contact, heroImages } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  return {
    title: dict.meta.reviews.title,
    description: dict.meta.reviews.description,
    alternates: pageAlternates(locale, "/reviews"),
  };
}

export default async function ReviewsPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const { testimonials } = getContent(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.pages.reviews.eyebrow}
        title={dict.pages.reviews.title}
        description={dict.pages.reviews.description}
        image={heroImages.reviews}
      />
      <TestimonialsSection locale={locale} />

      <section className="bg-[var(--ivory)] pb-4 pt-12">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-8 border-y border-[var(--sand-line)] px-5 py-8 md:px-8">
          <div>
            <p className="font-[family-name:var(--font-display)] text-5xl text-[var(--mocha)]">
              4.9
            </p>
            <p className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--charcoal-soft)]">
              {dict.pages.reviews.googleLabel}
            </p>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-[var(--charcoal-soft)]">
            {dict.pages.reviews.googleBody}
          </p>
          <a
            href={contact.maps}
            className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--mocha)]"
          >
            {dict.pages.reviews.googleLink}
          </a>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-16">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-5 md:grid-cols-3 md:px-8">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="border border-[var(--sand-line)] bg-[var(--ivory)] p-6"
            >
              <p className="font-[family-name:var(--font-display)] text-xl leading-snug">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="mt-6 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--mocha)]">
                {item.name} / {item.place}
              </p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-[1400px] px-5 md:px-8">
          <HoverButton href={href(locale, "/plan")}>
            {dict.buttons.bookYourExperience}
          </HoverButton>
        </div>
      </section>
    </>
  );
}
