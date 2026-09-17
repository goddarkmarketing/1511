"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { HoverButton } from "@/components/ui/hover-button";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/dict";
import { href, type Locale } from "@/lib/i18n";

export function BoatsSection({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const { boats } = getContent(locale);

  return (
    <section className="bg-[var(--ivory)] py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--mocha)]">
            {dict.home.boats.eyebrow}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.05] text-[var(--charcoal)]">
            {dict.home.boats.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--charcoal-soft)]">
            {dict.home.boats.body}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {boats.map((boat, index) => (
            <motion.article
              key={boat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="overflow-hidden bg-[var(--cream)]"
            >
              <Link
                href={href(locale, `/boats/${boat.id}`)}
                className="relative block aspect-[16/11]"
              >
                <Image
                  src={boat.image}
                  alt={boat.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </Link>
              <div className="p-7 md:p-9">
                <p className="font-[family-name:var(--font-script)] text-2xl text-[var(--mocha)]">
                  {boat.tagline}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--charcoal)]">
                  <Link href={href(locale, `/boats/${boat.id}`)}>{boat.name}</Link>
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--charcoal-soft)]">
                  {boat.description}
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-3">
                  {boat.features.slice(0, 6).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-[var(--charcoal)]"
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-[var(--mocha)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <HoverButton
                  href={href(locale, `/boats/${boat.id}`)}
                  className="mt-8"
                  size="sm"
                >
                  {dict.labels.viewBoatDetails}
                </HoverButton>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
