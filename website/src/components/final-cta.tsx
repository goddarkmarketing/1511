"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HoverButton } from "@/components/ui/hover-button";
import { getDict } from "@/lib/dict";
import { href, type Locale } from "@/lib/i18n";
import { contact } from "@/lib/site-config";

export function FinalCta({ locale }: { locale: Locale }) {
  const dict = getDict(locale);

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <Image
        src="/images/hero/cave.jpg"
        alt="Book your private Trang sea day"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[var(--charcoal)]/62" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-3xl px-5 text-center text-[var(--ivory)] md:px-8"
      >
        <p className="font-[family-name:var(--font-script)] text-3xl text-[var(--sand)] md:text-4xl">
          {dict.home.finalCta.script}
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.3rem,5vw,3.8rem)] leading-[1.05]">
          {dict.home.finalCta.title}
        </h2>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <HoverButton href={href(locale, "/plan")} variant="solid" size="lg">
            {dict.hero.ctaPrimary}
          </HoverButton>
          <HoverButton href={contact.whatsapp} variant="ghost" size="lg">
            {dict.buttons.talkToTeam}
          </HoverButton>
        </div>
      </motion.div>
    </section>
  );
}
