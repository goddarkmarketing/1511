"use client";

import { motion } from "framer-motion";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export function PhilosophyStrip({ locale }: { locale: Locale }) {
  const { philosophies } = getContent(locale);

  return (
    <section className="border-y border-[var(--sand-line)] bg-[var(--ivory)]">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-12 md:grid-cols-4 md:px-8 md:py-14">
        {philosophies.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="text-center md:text-left"
          >
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--mocha)]">
              {item.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--charcoal-soft)]">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
