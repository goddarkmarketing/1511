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
    title: dict.meta.bookingInfo.title,
    description: dict.meta.bookingInfo.description,
    alternates: pageAlternates(locale, "/booking-info"),
  };
}

export default async function BookingInfoPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const { bookingTerms, guestPolicy, parkFees, pierInfo, whatToBring } =
    getContent(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.pages.bookingInfo.eyebrow}
        title={dict.pages.bookingInfo.title}
        description={dict.pages.bookingInfo.description}
        image={heroImages.bookingInfo}
      />

      <section className="bg-[var(--ivory)] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 lg:grid-cols-[1.2fr_0.8fr] md:px-8">
          <div className="space-y-14">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
                {dict.pages.bookingInfo.bookingTitle}
              </h2>
              <div className="mt-6 space-y-5">
                {bookingTerms.map((term) => (
                  <div key={term.title} className="border-l-2 border-[var(--mocha)] pl-5">
                    <h3 className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--mocha)]">
                      {term.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal-soft)]">
                      {term.detail}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs leading-relaxed text-[var(--charcoal-soft)]">
                {dict.pages.bookingInfo.paymentNote}
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
                {dict.pages.bookingInfo.guestsTitle}
              </h2>
              <ul className="mt-6 space-y-3">
                {guestPolicy.map((rule) => (
                  <li
                    key={rule}
                    className="border-b border-[var(--sand-line)] pb-3 text-sm text-[var(--charcoal-soft)]"
                  >
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
                {dict.pages.bookingInfo.parkTitle}
              </h2>
              <p className="mt-3 text-sm text-[var(--charcoal-soft)]">
                {dict.pages.bookingInfo.parkBody}
              </p>
              <div className="mt-6 divide-y divide-[var(--sand-line)] border-y border-[var(--sand-line)]">
                {parkFees.map((fee) => (
                  <div
                    key={fee.guest}
                    className="flex items-baseline justify-between gap-6 py-3"
                  >
                    <p className="text-sm text-[var(--charcoal)]">{fee.guest}</p>
                    <p className="text-[var(--mocha)]">
                      {dict.labels.thb} {fee.fee}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
                {dict.pages.bookingInfo.rulesTitle}
              </h2>
              <ul className="mt-6 space-y-3 text-sm text-[var(--charcoal-soft)]">
                {dict.pages.bookingInfo.rules.map((rule) => (
                  <li key={rule} className="border-b border-[var(--sand-line)] pb-3">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="h-fit space-y-8 md:sticky md:top-28">
            <div className="border border-[var(--sand-line)] bg-[var(--cream)] p-8">
              <h3 className="font-[family-name:var(--font-display)] text-2xl">
                {dict.pages.bookingInfo.meetingTitle}
              </h3>
              <dl className="mt-6 space-y-5 text-sm">
                {pierInfo.map((item) => (
                  <div key={item.label}>
                    <dt className="uppercase tracking-[0.16em] text-[var(--mocha)]">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-[var(--charcoal-soft)]">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border border-[var(--sand-line)] bg-[var(--cream)] p-8">
              <h3 className="font-[family-name:var(--font-display)] text-2xl">
                {dict.pages.bookingInfo.bringTitle}
              </h3>
              <ul className="mt-5 space-y-2 text-sm text-[var(--charcoal-soft)]">
                {whatToBring.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-[var(--charcoal-soft)]">
                {dict.pages.bookingInfo.bringNote}
              </p>
              <HoverButton href={href(locale, "/plan")} className="mt-6 w-full">
                {dict.buttons.planYourDay}
              </HoverButton>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
