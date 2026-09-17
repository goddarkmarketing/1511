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
    title: dict.meta.transfers.title,
    description: dict.meta.transfers.description,
    alternates: pageAlternates(locale, "/transfers"),
  };
}

export default async function TransfersPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const { serviceAreas, transferNotes, transferRoutes } = getContent(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.pages.transfers.eyebrow}
        title={dict.pages.transfers.title}
        description={dict.pages.transfers.description}
        image={heroImages.transfers}
      />

      <section className="bg-[var(--ivory)] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 lg:grid-cols-[1.2fr_0.8fr] md:px-8">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
              {dict.pages.transfers.routesTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--charcoal-soft)]">
              {dict.pages.transfers.routesBody}
            </p>

            <div className="mt-8 divide-y divide-[var(--sand-line)] border-y border-[var(--sand-line)]">
              {transferRoutes.map((route) => (
                <div
                  key={route.to}
                  className="flex items-baseline justify-between gap-6 py-4"
                >
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-xl text-[var(--charcoal)]">
                      {route.to}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--charcoal-soft)]">
                      {dict.pages.transfers.fromLabel} {route.from}
                    </p>
                  </div>
                  <p className="shrink-0 text-lg font-medium text-[var(--mocha)]">
                    {dict.labels.thb} {route.price}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="mt-12 font-[family-name:var(--font-display)] text-2xl">
              {dict.pages.transfers.notesTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              {transferNotes.map((note) => (
                <li
                  key={note}
                  className="border-l-2 border-[var(--mocha)] pl-4 text-sm text-[var(--charcoal-soft)]"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit border border-[var(--sand-line)] bg-[var(--cream)] p-8 md:sticky md:top-28">
            <h3 className="font-[family-name:var(--font-display)] text-2xl">
              {dict.pages.transfers.areasTitle}
            </h3>
            <ul className="mt-5 space-y-2 text-sm text-[var(--charcoal-soft)]">
              {serviceAreas.map((area) => (
                <li key={area}>- {area}</li>
              ))}
            </ul>

            <p className="mt-8 text-sm leading-relaxed text-[var(--charcoal-soft)]">
              {dict.pages.transfers.sidebarBody}
            </p>

            <HoverButton href={href(locale, "/contact")} className="mt-6 w-full">
              {dict.buttons.requestTransfer}
            </HoverButton>
            <HoverButton
              href={href(locale, "/boats")}
              variant="dark"
              className="mt-3 w-full"
            >
              {dict.buttons.seeTheBoat}
            </HoverButton>
          </aside>
        </div>
      </section>
    </>
  );
}
