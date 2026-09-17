import Image from "next/image";
import Link from "next/link";
import { AnimatedHero } from "@/components/animated-hero";
import { BoatsSection } from "@/components/boats-section";
import { ExperiencesSection } from "@/components/experiences-section";
import { FinalCta } from "@/components/final-cta";
import { PhilosophyStrip } from "@/components/philosophy-strip";
import { TestimonialsSection } from "@/components/testimonials-section";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/dict";
import { href, locales, toLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: Props) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const { destinations, journalPosts, trustPoints } = getContent(locale);

  const serviceCards = [
    { ...dict.home.services.transfers, path: "/transfers" },
    { ...dict.home.services.bookingInfo, path: "/booking-info" },
    { ...dict.home.services.partners, path: "/partners" },
  ];

  return (
    <>
      <AnimatedHero locale={locale} />
      <PhilosophyStrip locale={locale} />
      <ExperiencesSection locale={locale} limit={4} />
      <BoatsSection locale={locale} />

      <section className="bg-[var(--cream)] py-20 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--mocha)]">
                {dict.home.destinations.eyebrow}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] text-[var(--charcoal)]">
                {dict.home.destinations.title}
              </h2>
            </div>
            <Link
              href={href(locale, "/destinations")}
              className="hidden text-[0.72rem] uppercase tracking-[0.18em] text-[var(--mocha)] md:inline"
            >
              {dict.labels.viewAllDestinations}
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.slice(0, 4).map((destination) => (
              <Link
                key={destination.slug}
                href={href(locale, `/destinations/${destination.slug}`)}
                className="group relative aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-[var(--ivory)]">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl">
                    {destination.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--ivory)]/80">
                    {destination.blurb}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--ivory)] py-20 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--mocha)]">
            {dict.home.trust.eyebrow}
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)]">
            {dict.home.trust.title}
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {trustPoints.slice(0, 3).map((item) => (
              <div key={item.title} className="border-t border-[var(--mocha)] pt-5">
                <h3 className="font-[family-name:var(--font-display)] text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--charcoal-soft)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
          <Link
            href={href(locale, "/about")}
            className="mt-10 inline-block text-[0.72rem] uppercase tracking-[0.18em] text-[var(--mocha)]"
          >
            {dict.home.trust.link}
          </Link>
        </div>
      </section>

      <TestimonialsSection locale={locale} />

      <section className="bg-[var(--cream)] py-20 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--mocha)]">
            {dict.home.services.eyebrow}
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)]">
            {dict.home.services.title}
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {serviceCards.map((card) => (
              <Link
                key={card.path}
                href={href(locale, card.path)}
                className="group border border-[var(--sand-line)] bg-[var(--ivory)] p-8 transition hover:border-[var(--mocha)]"
              >
                <h3 className="font-[family-name:var(--font-display)] text-2xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--charcoal-soft)]">
                  {card.detail}
                </p>
                <span className="mt-6 inline-block text-[0.68rem] uppercase tracking-[0.18em] text-[var(--mocha)]">
                  {card.cta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--ivory)] py-20 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--mocha)]">
                {dict.home.journal.eyebrow}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)]">
                {dict.home.journal.title}
              </h2>
            </div>
            <Link
              href={href(locale, "/journal")}
              className="hidden text-[0.72rem] uppercase tracking-[0.18em] text-[var(--mocha)] md:inline"
            >
              {dict.buttons.readJournal}
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {journalPosts.map((post) => (
              <Link
                key={post.slug}
                href={href(locale, `/journal/${post.slug}`)}
                className="group"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="33vw"
                  />
                </div>
                <p className="mt-4 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--mocha)]">
                  {post.tag}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-snug">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta locale={locale} />
    </>
  );
}
