"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock3, Users } from "lucide-react";
import { HoverButton } from "@/components/ui/hover-button";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/dict";
import { href, type Locale } from "@/lib/i18n";

export function ExperiencesSection({
  locale,
  limit,
}: {
  locale: Locale;
  limit?: number;
}) {
  const dict = getDict(locale);
  const { experiences } = getContent(locale);
  const items = limit ? experiences.slice(0, limit) : experiences;

  return (
    <section className="bg-[var(--cream)] py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--mocha)]">
              {dict.home.experiences.eyebrow}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)]">
              {dict.home.experiences.title}
            </h2>
          </div>
          <div className="max-w-xl md:text-right">
            <p className="text-sm leading-relaxed text-[var(--charcoal-soft)]">
              {dict.home.experiences.body}
            </p>
            {limit ? (
              <Link
                href={href(locale, "/experiences")}
                className="mt-4 inline-block text-[0.72rem] uppercase tracking-[0.18em] text-[var(--mocha)]"
              >
                {dict.labels.viewAllExperiences}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((experience, index) => (
            <motion.article
              key={experience.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group flex flex-col"
            >
              <Link
                href={href(locale, `/experiences/${experience.slug}`)}
                className="relative aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 bg-[var(--ivory)]/92 px-3 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-[var(--mocha)]">
                  {experience.boat}
                </span>
              </Link>

              <div className="flex flex-1 flex-col pt-5">
                <h3 className="font-[family-name:var(--font-display)] text-[1.55rem] leading-tight text-[var(--charcoal)]">
                  <Link href={href(locale, `/experiences/${experience.slug}`)}>
                    {experience.title}
                  </Link>
                </h3>

                <div className="mt-3 flex flex-wrap gap-4 text-[0.72rem] uppercase tracking-[0.12em] text-[var(--charcoal-soft)]">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={13} />
                    {experience.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users size={13} />
                    {experience.capacity}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[var(--charcoal-soft)]">
                  {experience.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[var(--sand-line)] px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-[var(--charcoal-soft)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <p className="mb-4 text-[1.05rem] font-medium text-[var(--mocha)]">
                    {dict.labels.from} {experience.price} {dict.labels.thb}
                  </p>
                  <HoverButton
                    href={href(locale, `/experiences/${experience.slug}`)}
                    className="w-full"
                    size="sm"
                  >
                    {dict.labels.viewDetails}
                  </HoverButton>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
