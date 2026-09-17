"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/dict";
import { href, type Locale } from "@/lib/i18n";

export function DestinationsSection({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const { destinations, travelStyles } = getContent(locale);

  return (
    <section className="bg-[var(--cream)] py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--mocha)]">
              {dict.pages.destinations.eyebrow}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.1rem,4.8vw,3.3rem)] text-[var(--charcoal)]">
              {dict.pages.destinations.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[var(--charcoal-soft)]">
            {dict.pages.destinations.description}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {destinations.map((destination, index) => (
            <motion.article
              key={destination.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={`group relative overflow-hidden ${
                index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <Link
                href={href(locale, `/destinations/${destination.slug}`)}
                className={`relative block ${
                  index === 0
                    ? "aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[420px]"
                    : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.05]"
                  sizes="(max-width: 1024px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-[var(--ivory)]">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl">
                    {destination.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--ivory)]/80">
                    {destination.blurb}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 border-t border-[var(--sand-line)] pt-12 md:grid-cols-5">
          {travelStyles.map((style) => (
            <div key={style.title}>
              <h3 className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-[var(--mocha)]">
                {style.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--charcoal-soft)]">
                {style.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
