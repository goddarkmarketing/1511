import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
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
    title: dict.meta.partners.title,
    description: dict.meta.partners.description,
    alternates: pageAlternates(locale, "/partners"),
  };
}

export default async function PartnersPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const { experiences, partnerProperties } = getContent(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.pages.partners.eyebrow}
        title={dict.pages.partners.title}
        description={dict.pages.partners.description}
        image={heroImages.partners}
      />

      <section className="bg-[var(--ivory)] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 lg:grid-cols-[1.2fr_0.8fr] md:px-8">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
              {dict.pages.partners.ratesTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--charcoal-soft)]">
              {dict.pages.partners.ratesBody}
            </p>

            <div className="mt-8 divide-y divide-[var(--sand-line)] border-y border-[var(--sand-line)]">
              {experiences.map((experience) => (
                <div
                  key={experience.slug}
                  className="grid gap-2 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-baseline sm:gap-8"
                >
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-xl text-[var(--charcoal)]">
                      {experience.title}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--charcoal-soft)]">
                      {experience.duration}
                    </p>
                  </div>
                  <p className="text-sm text-[var(--charcoal-soft)] line-through">
                    {dict.labels.thb} {experience.price}
                  </p>
                  <p className="text-lg font-medium text-[var(--mocha)]">
                    {dict.labels.thb} {experience.agentPrice}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="mt-12 font-[family-name:var(--font-display)] text-2xl">
              {dict.pages.partners.benefitsTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--charcoal-soft)]">
              {dict.pages.partners.benefits.map((benefit) => (
                <li key={benefit} className="border-l-2 border-[var(--mocha)] pl-4">
                  {benefit}
                </li>
              ))}
            </ul>

            <h3 className="mt-12 font-[family-name:var(--font-display)] text-2xl">
              {dict.pages.partners.staysTitle}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--charcoal-soft)]">
              {dict.pages.partners.staysBody}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {partnerProperties.map((property) => (
                <div
                  key={property.name}
                  className="border border-[var(--sand-line)] bg-[var(--cream)] p-5"
                >
                  <p className="font-[family-name:var(--font-display)] text-lg text-[var(--charcoal)]">
                    {property.name}
                  </p>
                  <p className="mt-2 text-xs text-[var(--charcoal-soft)]">
                    {property.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit border border-[var(--sand-line)] bg-[var(--cream)] p-8 md:sticky md:top-28">
            <h3 className="font-[family-name:var(--font-display)] text-2xl">
              {dict.pages.partners.formTitle}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[var(--charcoal-soft)]">
              {dict.pages.partners.formBody}
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <a
                href={contact.whatsapp}
                className="block border border-[var(--sand-line)] bg-[var(--ivory)] p-4 transition hover:border-[var(--mocha)]"
              >
                <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-[var(--mocha)]">
                  WhatsApp
                </span>
                <span className="mt-1 block">{contact.phone}</span>
              </a>
              <a
                href={contact.line}
                className="block border border-[var(--sand-line)] bg-[var(--ivory)] p-4 transition hover:border-[var(--mocha)]"
              >
                <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-[var(--mocha)]">
                  LINE
                </span>
                <span className="mt-1 block">@trangvoyage</span>
              </a>
              <a
                href={`mailto:${contact.email}?subject=Partnership enquiry`}
                className="block border border-[var(--sand-line)] bg-[var(--ivory)] p-4 transition hover:border-[var(--mocha)]"
              >
                <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-[var(--mocha)]">
                  Email
                </span>
                <span className="mt-1 block">{contact.email}</span>
              </a>
            </div>

            <HoverButton
              href={href(locale, "/transfers")}
              variant="dark"
              className="mt-6 w-full"
            >
              {dict.buttons.transferRates}
            </HoverButton>
          </aside>
        </div>
      </section>
    </>
  );
}
