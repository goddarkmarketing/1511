import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { HoverButton } from "@/components/ui/hover-button";
import { en } from "@/lib/content/en";
import { getContent, getExperience } from "@/lib/content";
import { getDict } from "@/lib/dict";
import { href, locales, toLocale } from "@/lib/i18n";
import { pageAlternates } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    en.experiences.map((experience) => ({ locale, slug: experience.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
  const experience = getExperience(locale, slug);
  if (!experience) return { title: "Experience" };
  return {
    title: experience.title,
    description: experience.summary,
    alternates: pageAlternates(locale, `/experiences/${experience.slug}`),
  };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const experience = getExperience(locale, slug);
  if (!experience) notFound();

  const { guestPolicy, parkFees } = getContent(locale);

  return (
    <>
      <PageHero
        eyebrow={experience.boat}
        title={experience.title}
        description={experience.summary}
        image={experience.image}
      />

      <section className="bg-[var(--ivory)] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:grid-cols-[1.2fr_0.8fr] md:px-8">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--mocha)]">
              {dict.labels.home} / {dict.nav.experiences} / {experience.title}
            </p>
            <p className="mt-4 font-[family-name:var(--font-script)] text-3xl text-[var(--mocha)]">
              {experience.nickname}
            </p>

            <div className="mt-6 grid gap-4 border-y border-[var(--sand-line)] py-5 sm:grid-cols-3">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-[var(--mocha)]">
                  {dict.labels.departure}
                </p>
                {experience.timeWindows.map((window) => (
                  <p key={window} className="mt-1 text-sm text-[var(--charcoal)]">
                    {window}
                  </p>
                ))}
              </div>
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-[var(--mocha)]">
                  {dict.labels.stops}
                </p>
                <p className="mt-1 text-sm text-[var(--charcoal)]">
                  {experience.stops}
                </p>
              </div>
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-[var(--mocha)]">
                  {dict.labels.sailingTime}
                </p>
                <p className="mt-1 text-sm text-[var(--charcoal)]">
                  {experience.travelTime}
                </p>
              </div>
            </div>

            <h2 className="mt-12 font-[family-name:var(--font-display)] text-3xl md:text-4xl">
              {dict.pages.experiences.whatMakesSpecial}
            </h2>
            <ul className="mt-6 space-y-3">
              {experience.highlights.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-[var(--mocha)] pl-4 text-[var(--charcoal-soft)]"
                >
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-12 font-[family-name:var(--font-display)] text-2xl">
              {dict.pages.experiences.sampleItinerary}
            </h3>
            <div className="mt-6 space-y-4">
              {experience.itinerary.map((step) => (
                <div
                  key={step.time}
                  className="grid gap-2 border-b border-[var(--sand-line)] pb-4 md:grid-cols-[140px_1fr]"
                >
                  <p className="text-sm font-medium text-[var(--mocha)]">
                    {step.time}
                  </p>
                  <p className="text-sm text-[var(--charcoal-soft)]">{step.detail}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-12 font-[family-name:var(--font-display)] text-2xl">
              {dict.labels.gallery}
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {experience.gallery.map((src) => (
                <div key={src} className="relative aspect-[4/5] overflow-hidden">
                  <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-8 border-t border-[var(--sand-line)] pt-10 md:grid-cols-2">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl">
                  {dict.labels.guestsPricing}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-[var(--charcoal-soft)]">
                  {guestPolicy.map((rule) => (
                    <li key={rule}>- {rule}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl">
                  {dict.labels.parkFees}
                </h3>
                <p className="mt-4 text-sm text-[var(--charcoal-soft)]">
                  {dict.labels.parkFeesNote}
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[var(--charcoal-soft)]">
                  {parkFees.map((fee) => (
                    <li key={fee.guest}>
                      - {fee.guest}: {dict.labels.thb} {fee.fee}
                    </li>
                  ))}
                </ul>
                <Link
                  href={href(locale, "/booking-info")}
                  className="mt-5 inline-block text-[0.72rem] uppercase tracking-[0.18em] text-[var(--mocha)]"
                >
                  {dict.labels.fullBookingInfo}
                </Link>
              </div>
            </div>
          </div>

          <aside className="h-fit border border-[var(--sand-line)] bg-[var(--cream)] p-6 md:sticky md:top-28 md:p-8">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mocha)]">
              {dict.labels.from}
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-4xl">
              {experience.price} {dict.labels.thb}
            </p>
            <p className="mt-1 text-sm text-[var(--charcoal-soft)]">
              {dict.pages.experiences.privateSpeedboatBase}{" "}
              {experience.longtailPrice} {dict.labels.thb}.
            </p>

            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="uppercase tracking-[0.16em] text-[var(--mocha)]">
                  {dict.labels.duration}
                </dt>
                <dd className="mt-1">{experience.duration}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.16em] text-[var(--mocha)]">
                  {dict.labels.capacity}
                </dt>
                <dd className="mt-1">{experience.capacity}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.16em] text-[var(--mocha)]">
                  {dict.labels.bestFor}
                </dt>
                <dd className="mt-1">{experience.bestFor.join(", ")}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.16em] text-[var(--mocha)]">
                  {dict.labels.meetingPoint}
                </dt>
                <dd className="mt-1">{experience.meetingPoint}</dd>
              </div>
            </dl>

            <div className="mt-8 space-y-3">
              <HoverButton
                href={`${href(locale, "/plan")}?experience=${experience.slug}`}
                className="w-full"
              >
                {dict.buttons.bookThisExperience}
              </HoverButton>
              <HoverButton
                href={href(locale, "/boats")}
                variant="dark"
                className="w-full"
              >
                {dict.buttons.compareBoats}
              </HoverButton>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-[var(--charcoal-soft)]">
              {dict.labels.depositNote}
            </p>

            <h4 className="mt-8 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--mocha)]">
              {dict.labels.includes}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--charcoal-soft)]">
              {experience.includes.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>

            <h4 className="mt-8 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--mocha)]">
              {dict.labels.notes}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--charcoal-soft)]">
              {experience.notes.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-12">
        <div className="mx-auto flex max-w-[1400px] flex-wrap gap-6 px-5 md:px-8">
          <Link href={href(locale, "/experiences")} className="text-sm text-[var(--mocha)]">
            {dict.buttons.backToExperiences}
          </Link>
          <Link href={href(locale, "/destinations")} className="text-sm text-[var(--mocha)]">
            {dict.buttons.exploreDestinations}
          </Link>
          <Link href={href(locale, "/booking-info")} className="text-sm text-[var(--mocha)]">
            {dict.buttons.bookingInfo}
          </Link>
        </div>
      </section>
    </>
  );
}
