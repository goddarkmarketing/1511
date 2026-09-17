"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/dict";
import type { Locale } from "@/lib/i18n";

export function TestimonialsSection({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const { testimonials } = getContent(locale);
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  const prev = () =>
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section className="relative overflow-hidden bg-[var(--charcoal)] py-20 text-[var(--ivory)] md:py-28">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url(/images/hero/sea.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-[var(--charcoal)]/78" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--sand)]">
          {dict.home.testimonials.eyebrow}
        </p>

        <div className="mt-5 flex items-center justify-center gap-1 text-[var(--sand)]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </div>

        <div className="relative mt-8 min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.25rem)] leading-snug"
            >
              &ldquo;{active.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <p className="mt-8 text-sm uppercase tracking-[0.18em] text-[var(--sand)]">
          {active.name} / {active.place}
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label={dict.home.testimonials.prev}
            className="inline-flex h-11 w-11 items-center justify-center border border-[var(--ivory)]/30 transition hover:bg-[var(--ivory)]/10"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={dict.home.testimonials.next}
            className="inline-flex h-11 w-11 items-center justify-center border border-[var(--ivory)]/30 transition hover:bg-[var(--ivory)]/10"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
