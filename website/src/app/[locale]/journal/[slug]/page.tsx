import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { HoverButton } from "@/components/ui/hover-button";
import { getJournalPost } from "@/lib/content";
import { en } from "@/lib/content/en";
import { getDict } from "@/lib/dict";
import { href, locales, toLocale } from "@/lib/i18n";
import { pageAlternates } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    en.journalPosts.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
  const post = getJournalPost(locale, slug);
  if (!post) return { title: "Journal" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: pageAlternates(locale, `/journal/${post.slug}`),
  };
}

export default async function JournalDetailPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
  const dict = getDict(locale);
  const post = getJournalPost(locale, slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow={`${post.tag} / ${post.date}`}
        title={post.title}
        description={post.excerpt}
        image={post.image}
      />
      <section className="bg-[var(--ivory)] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="space-y-6 text-base leading-relaxed text-[var(--charcoal-soft)]">
            {post.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <HoverButton href={href(locale, "/plan")}>
              {dict.buttons.planYourDay}
            </HoverButton>
            <Link
              href={href(locale, "/journal")}
              className="self-center text-sm text-[var(--mocha)]"
            >
              {dict.buttons.backToJournal}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
