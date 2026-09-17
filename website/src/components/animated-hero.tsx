"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HoverButton } from "@/components/ui/hover-button";
import { getDict } from "@/lib/dict";
import { href, type Locale } from "@/lib/i18n";

export function AnimatedHero({ locale }: { locale: Locale }) {
  const dict = getDict(locale);

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <Image
        src="/images/hero/aerial.jpg"
        alt="Private speedboat experience across the Trang Sea"
        fill
        priority
        className="object-cover object-[center_40%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,18,14,0.55)_0%,rgba(22,18,14,0.28)_42%,rgba(22,18,14,0.62)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,248,236,0.12),transparent_42%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-8 md:pb-24 md:pt-24">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[var(--sand)]"
          >
            {dict.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: "easeOut" }}
            className="font-[family-name:var(--font-display)] text-[clamp(2.8rem,8vw,5.6rem)] leading-[0.92] tracking-[-0.03em] text-[var(--ivory)]"
          >
            {dict.hero.titleLine1}
            <br />
            {dict.hero.titleLine2}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 font-[family-name:var(--font-script)] text-[clamp(1.6rem,3.4vw,2.35rem)] text-[var(--sand)]"
          >
            {dict.brand.script}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-[var(--ivory)]/85"
          >
            {dict.hero.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <HoverButton href={href(locale, "/plan")} variant="solid" size="lg">
              {dict.hero.ctaPrimary}
            </HoverButton>
            <HoverButton href={href(locale, "/experiences")} variant="ghost" size="lg">
              {dict.hero.ctaSecondary}
            </HoverButton>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[0.62rem] uppercase tracking-[0.42em] text-[var(--ivory)]/55 xl:block"
        >
          {dict.hero.side}
        </motion.p>
      </div>
    </section>
  );
}
