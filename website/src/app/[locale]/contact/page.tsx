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
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: pageAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const { pierInfo } = getContent(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.pages.contact.eyebrow}
        title={dict.pages.contact.title}
        description={dict.pages.contact.description}
        image={heroImages.contact}
      />

      <section className="bg-[var(--ivory)] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 md:grid-cols-2 md:px-8">
          <div className="space-y-6">
            <a
              href={contact.whatsapp}
              className="block border border-[var(--sand-line)] p-6 transition hover:bg-[var(--cream)]"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--mocha)]">
                {dict.pages.contact.whatsapp}
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-2xl">
                {contact.phone}
              </p>
            </a>
            <a
              href={contact.line}
              className="block border border-[var(--sand-line)] p-6 transition hover:bg-[var(--cream)]"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--mocha)]">
                {dict.pages.contact.line}
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-2xl">
                @trangvoyage
              </p>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="block border border-[var(--sand-line)] p-6 transition hover:bg-[var(--cream)]"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--mocha)]">
                {dict.pages.contact.email}
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-2xl">
                {contact.email}
              </p>
            </a>
            <a
              href={contact.maps}
              target="_blank"
              rel="noreferrer"
              className="block border border-[var(--sand-line)] p-6 transition hover:bg-[var(--cream)]"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--mocha)]">
                {dict.labels.meetingPoint}
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-2xl">
                Hat Yao Pier, Trang
              </p>
            </a>
          </div>

          <div className="bg-[var(--cream)] p-8 md:p-10">
            <h2 className="font-[family-name:var(--font-display)] text-3xl">
              {dict.pages.contact.readyTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--charcoal-soft)]">
              {dict.pages.contact.readyBody}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <HoverButton href={href(locale, "/plan")}>
                {dict.buttons.planYourDay}
              </HoverButton>
              <HoverButton href={contact.whatsapp} variant="dark">
                {dict.pages.contact.whatsappCta}
              </HoverButton>
            </div>

            <h3 className="mt-10 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--mocha)]">
              {dict.pages.contact.beforeTravel}
            </h3>
            <dl className="mt-4 space-y-4 text-sm">
              {pierInfo.map((item) => (
                <div key={item.label}>
                  <dt className="text-[var(--charcoal)]">{item.label}</dt>
                  <dd className="mt-1 text-[var(--charcoal-soft)]">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <h2 className="pt-16 font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            {dict.pages.contact.mapTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-[var(--charcoal-soft)]">
            {dict.pages.contact.mapBody}
          </p>
          <div className="mt-8 aspect-[16/9] w-full overflow-hidden border border-[var(--sand-line)]">
            <iframe
              title="Hat Yao Pier, Trang"
              src="https://www.google.com/maps?q=Hat%20Yao%20Pier%20Trang&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
