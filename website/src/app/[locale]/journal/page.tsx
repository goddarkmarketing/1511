import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
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
    title: dict.meta.journal.title,
    description: dict.meta.journal.description,
    alternates: pageAlternates(locale, "/journal"),
  };
}

export default async function JournalPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const { journalPosts } = getContent(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.pages.journal.eyebrow}
        title={dict.pages.journal.title}
        description={dict.pages.journal.description}
        image={heroImages.journal}
      />
      <section className="bg-[var(--cream)] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 md:grid-cols-3 md:px-8">
          {journalPosts.map((post) => (
            <Link
              key={post.slug}
              href={href(locale, `/journal/${post.slug}`)}
              className="group bg-[var(--ivory)]"
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
              <div className="p-6">
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--mocha)]">
                  {post.tag} / {post.date}
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl leading-snug">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm text-[var(--charcoal-soft)]">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
