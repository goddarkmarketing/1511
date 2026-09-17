import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { HoverButton } from "@/components/ui/hover-button";
import { getDestination, getExperience } from "@/lib/content";
import { en } from "@/lib/content/en";
import { getDict } from "@/lib/dict";
import { href, locales, toLocale } from "@/lib/i18n";
import { pageAlternates } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    en.destinations.map((destination) => ({ locale, slug: destination.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
  const destination = getDestination(locale, slug);
  if (!destination) return { title: "Destination" };
  return {
    title: destination.name,
    description: destination.blurb,
    alternates: pageAlternates(locale, `/destinations/${destination.slug}`),
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const destination = getDestination(locale, slug);
  if (!destination) notFound();

  const related = destination.relatedExperienceSlugs
    .map((item) => getExperience(locale, item))
    .filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={dict.pages.destinations.single}
        title={destination.name}
        description={destination.subtitle}
        image={destination.image}
      />

      <section className="bg-[var(--ivory)] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 lg:grid-cols-[1.2fr_0.8fr] md:px-8">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mocha)]">
              {dict.labels.home} / {dict.nav.destinations} / {destination.name}
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl md:text-4xl">
              {dict.pages.destinations.whyVisit}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--charcoal-soft)]">
              {destination.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {destination.gallery.map((src) => (
                <div key={src} className="relative aspect-[4/5] overflow-hidden">
                  <Image src={src} alt="" fill className="object-cover" sizes="30vw" />
                </div>
              ))}
            </div>

            {related.length > 0 ? (
              <div className="mt-12">
                <h3 className="font-[family-name:var(--font-display)] text-2xl">
                  {dict.pages.destinations.recommended}
                </h3>
                <div className="mt-6 space-y-4">
                  {related.map((experience) =>
                    experience ? (
                      <Link
                        key={experience.slug}
                        href={href(locale, `/experiences/${experience.slug}`)}
                        className="flex flex-col gap-2 border border-[var(--sand-line)] p-5 transition hover:bg-[var(--cream)] md:flex-row md:items-center md:justify-between"
                      >
                        <div>
                          <p className="font-[family-name:var(--font-display)] text-xl">
                            {experience.title}
                          </p>
                          <p className="mt-1 text-sm text-[var(--charcoal-soft)]">
                            {experience.summary}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm text-[var(--mocha)]">
                          {dict.labels.from} {experience.price} {dict.labels.thb}
                        </p>
                      </Link>
                    ) : null,
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="h-fit border border-[var(--sand-line)] bg-[var(--cream)] p-8 md:sticky md:top-28">
            <h3 className="font-[family-name:var(--font-display)] text-2xl">
              {dict.labels.quickFacts}
            </h3>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="uppercase tracking-[0.16em] text-[var(--mocha)]">
                  {dict.labels.bestFor}
                </dt>
                <dd className="mt-1">{destination.bestFor.join(", ")}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.16em] text-[var(--mocha)]">
                  {dict.labels.bestTime}
                </dt>
                <dd className="mt-1">{destination.bestTime}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.16em] text-[var(--mocha)]">
                  {dict.labels.howToGetThere}
                </dt>
                <dd className="mt-1">{destination.howToGetThere}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.16em] text-[var(--mocha)]">
                  {dict.labels.recommendedBoat}
                </dt>
                <dd className="mt-1">{destination.recommendedBoat}</dd>
              </div>
            </dl>
            <HoverButton href={href(locale, "/plan")} className="mt-8 w-full">
              {dict.buttons.planADayHere}
            </HoverButton>
          </aside>
        </div>
      </section>
    </>
  );
}
