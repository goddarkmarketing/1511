import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { HoverButton } from "@/components/ui/hover-button";
import { getBoat } from "@/lib/content";
import { en } from "@/lib/content/en";
import { getDict } from "@/lib/dict";
import { href, locales, toLocale } from "@/lib/i18n";
import { pageAlternates } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string; id: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => en.boats.map((boat) => ({ locale, id: boat.id })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, id } = await params;
  const locale = toLocale(raw);
  const boat = getBoat(locale, id);
  if (!boat) return { title: "Boat" };
  return {
    title: boat.name,
    description: boat.description,
    alternates: pageAlternates(locale, `/boats/${boat.id}`),
  };
}

export default async function BoatDetailPage({ params }: Props) {
  const { locale: raw, id } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const boat = getBoat(locale, id);
  if (!boat) notFound();

  return (
    <>
      <PageHero
        eyebrow={dict.pages.boats.fleet}
        title={boat.name}
        description={boat.tagline}
        image={boat.image}
      />

      <section className="bg-[var(--ivory)] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] md:px-8">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
              {dict.pages.boats.aboutThisBoat}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--charcoal-soft)]">
              {boat.longDescription}
            </p>

            <h3 className="mt-10 font-[family-name:var(--font-display)] text-2xl">
              {dict.labels.idealFor}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {boat.idealFor.map((item) => (
                <span
                  key={item}
                  className="border border-[var(--sand-line)] px-3 py-1 text-[0.7rem] uppercase tracking-[0.14em]"
                >
                  {item}
                </span>
              ))}
            </div>

            <h3 className="mt-10 font-[family-name:var(--font-display)] text-2xl">
              {dict.labels.features}
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {boat.features.map((feature) => (
                <li
                  key={feature}
                  className="border border-[var(--sand-line)] bg-[var(--cream)] px-4 py-3 text-sm"
                >
                  {feature}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 font-[family-name:var(--font-display)] text-2xl">
              {dict.pages.boats.whatStandsOut}
            </h3>
            <div className="mt-4 space-y-5">
              {boat.highlights.map((item) => (
                <div key={item.title} className="border-l-2 border-[var(--mocha)] pl-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--mocha)]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal-soft)]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {boat.gallery.map((src) => (
                <div key={src} className="relative aspect-[4/5] overflow-hidden">
                  <Image src={src} alt="" fill className="object-cover" sizes="30vw" />
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit border border-[var(--sand-line)] bg-[var(--cream)] p-8 md:sticky md:top-28">
            <h3 className="font-[family-name:var(--font-display)] text-2xl">
              {dict.labels.specifications}
            </h3>
            <dl className="mt-6 space-y-4">
              {boat.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-start justify-between gap-4 border-b border-[var(--sand-line)] pb-3 text-sm"
                >
                  <dt className="text-[var(--mocha)]">{spec.label}</dt>
                  <dd className="text-right text-[var(--charcoal)]">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <HoverButton
              href={`${href(locale, "/plan")}?boat=${boat.id}`}
              className="mt-8 w-full"
            >
              {dict.buttons.planWithThisBoat}
            </HoverButton>
            <HoverButton
              href={href(locale, "/experiences")}
              variant="dark"
              className="mt-3 w-full"
            >
              {dict.buttons.browseExperiences}
            </HoverButton>
          </aside>
        </div>
      </section>
    </>
  );
}
