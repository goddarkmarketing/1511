"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { HoverButton } from "@/components/ui/hover-button";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/dict";
import { href, type Locale } from "@/lib/i18n";
import {
  formatTHB,
  priceBreakdown,
  selectionToQuery,
  type BoatId,
  type Duration,
} from "@/lib/pricing";
import { pricingConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  standalone?: boolean;
  initialExperience?: string;
  initialBoat?: BoatId;
};

export function PlanSection({
  locale,
  standalone = false,
  initialExperience,
  initialBoat,
}: Props) {
  const dict = getDict(locale);
  const content = getContent(locale);
  const { addOns, boats, experiences } = content;

  const durations: { id: Duration; label: string }[] = [
    { id: "half", label: dict.labels.halfDay },
    { id: "full", label: dict.labels.fullDay },
  ];

  const [guests, setGuests] = useState(4);
  const [boat, setBoat] = useState<BoatId>(initialBoat ?? "speedboat");
  const [destination, setDestination] = useState(
    experiences.find((item) => item.slug === initialExperience)?.slug ??
      experiences[0].slug,
  );
  const [duration, setDuration] = useState<Duration>("half");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const selectedExperience = experiences.find((e) => e.slug === destination)!;
  const selectedBoat = boats.find((b) => b.id === boat)!;
  const selectedDuration = durations.find((d) => d.id === duration)!;

  const selection = useMemo(
    () => ({
      experienceSlug: destination,
      boatId: boat,
      guests,
      duration,
      addOnIds: selectedAddOns,
    }),
    [boat, destination, duration, guests, selectedAddOns],
  );

  const breakdown = useMemo(
    () => priceBreakdown(content, selection),
    [content, selection],
  );

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const steps = (
    <div className="space-y-10">
      <div>
        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mocha)]">
          {dict.pages.plan.step1}
        </p>
        <div className="mt-3 flex items-center gap-4">
          <button
            type="button"
            className="h-11 w-11 border border-[var(--sand-line)] text-lg"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
          >
            -
          </button>
          <span className="min-w-10 text-center font-[family-name:var(--font-display)] text-3xl">
            {guests}
          </span>
          <button
            type="button"
            className="h-11 w-11 border border-[var(--sand-line)] text-lg"
            onClick={() =>
              setGuests((g) => Math.min(pricingConfig.maxGuests, g + 1))
            }
          >
            +
          </button>
        </div>
      </div>

      <div>
        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mocha)]">
          {dict.pages.plan.step2}
        </p>
        <div className="mt-4 space-y-3">
          {boats.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setBoat(option.id as BoatId)}
              className={cn(
                "flex w-full items-center gap-4 border p-3 text-left transition",
                boat === option.id
                  ? "border-[var(--mocha)] bg-[var(--ivory)]"
                  : "border-[var(--sand-line)] bg-transparent hover:border-[var(--mocha)]/50",
              )}
            >
              <div className="relative h-16 w-24 shrink-0 overflow-hidden sm:h-20 sm:w-28">
                <Image
                  src={option.image}
                  alt={option.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block truncate font-[family-name:var(--font-display)] text-lg text-[var(--charcoal)]">
                  {option.name}
                </span>
                <span className="mt-0.5 block truncate font-[family-name:var(--font-script)] text-base text-[var(--mocha)]">
                  {option.tagline}
                </span>
              </div>
              {boat === option.id ? (
                <span className="shrink-0 bg-[var(--mocha)] px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.14em] text-[var(--ivory)]">
                  {dict.labels.selected}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mocha)]">
          {dict.pages.plan.step3}
        </p>
        <div className="mt-4 space-y-3">
          {experiences.map((experience) => (
            <button
              key={experience.slug}
              type="button"
              onClick={() => setDestination(experience.slug)}
              className={cn(
                "flex w-full items-center gap-4 border p-3 text-left transition",
                destination === experience.slug
                  ? "border-[var(--mocha)] bg-[var(--ivory)]"
                  : "border-[var(--sand-line)] bg-transparent hover:border-[var(--mocha)]/50",
              )}
            >
              <div className="relative h-16 w-24 shrink-0 overflow-hidden sm:h-20 sm:w-28">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block truncate font-[family-name:var(--font-display)] text-lg text-[var(--charcoal)]">
                  {experience.title}
                </span>
                <span className="mt-0.5 block text-xs uppercase tracking-[0.14em] text-[var(--charcoal-soft)]">
                  {experience.duration}
                </span>
                <span className="mt-1 block text-sm text-[var(--mocha)]">
                  {dict.labels.from} {experience.price} {dict.labels.thb}
                </span>
              </div>
              {destination === experience.slug ? (
                <span className="shrink-0 bg-[var(--mocha)] px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.14em] text-[var(--ivory)]">
                  {dict.labels.selected}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mocha)]">
          {dict.pages.plan.step4}
        </p>
        <div className="mt-3 flex gap-3">
          {durations.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setDuration(item.id)}
              className={cn(
                "h-11 flex-1 border text-xs uppercase tracking-[0.16em] transition",
                duration === item.id
                  ? "border-[var(--mocha)] bg-[var(--mocha)] text-[var(--ivory)]"
                  : "border-[var(--sand-line)] text-[var(--charcoal)]",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mocha)]">
          {dict.pages.plan.step5}
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {addOns.map((item) => (
            <label
              key={item.id}
              className="flex cursor-pointer items-center gap-3 border border-[var(--sand-line)] bg-[var(--ivory)] px-3 py-3 text-sm"
            >
              <input
                type="checkbox"
                checked={selectedAddOns.includes(item.id)}
                onChange={() => toggleAddOn(item.id)}
                className="accent-[var(--mocha)]"
              />
              <span className="flex-1">{item.name}</span>
              <span className="whitespace-nowrap text-[var(--mocha)]">
                {dict.labels.thb} {item.price}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const priceSidebar = (
    <aside className="h-fit border border-[var(--sand-line)] bg-[var(--cream)] p-6 md:sticky md:top-28 md:p-8">
      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mocha)]">
        {dict.pages.plan.sidebarEyebrow}
      </p>
      <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--charcoal)]">
        {dict.pages.plan.sidebarTitle}
      </p>
      <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--charcoal)]">
        {dict.labels.thb} {formatTHB(breakdown.total)}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-[var(--charcoal-soft)]">
        {dict.pages.plan.disclaimerPrefix} {pricingConfig.baseGuests}{" "}
        {dict.pages.plan.disclaimerSuffix}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="overflow-hidden border border-[var(--sand-line)] bg-[var(--ivory)]">
          <div className="relative aspect-[4/3]">
            <Image
              src={selectedBoat.image}
              alt={selectedBoat.name}
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
          <p className="px-2 py-2 text-[0.65rem] uppercase tracking-[0.12em] text-[var(--charcoal-soft)]">
            {dict.labels.boat}
          </p>
        </div>
        <div className="overflow-hidden border border-[var(--sand-line)] bg-[var(--ivory)]">
          <div className="relative aspect-[4/3]">
            <Image
              src={selectedExperience.image}
              alt={selectedExperience.title}
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
          <p className="px-2 py-2 text-[0.65rem] uppercase tracking-[0.12em] text-[var(--charcoal-soft)]">
            {dict.labels.island}
          </p>
        </div>
      </div>

      <dl className="mt-8 space-y-4 text-sm">
        <div>
          <dt className="uppercase tracking-[0.16em] text-[var(--mocha)]">
            {dict.labels.guests}
          </dt>
          <dd className="mt-1">{guests}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-[0.16em] text-[var(--mocha)]">
            {dict.labels.boat}
          </dt>
          <dd className="mt-1">{selectedBoat.name}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-[0.16em] text-[var(--mocha)]">
            {dict.labels.experience}
          </dt>
          <dd className="mt-1">{selectedExperience.title}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-[0.16em] text-[var(--mocha)]">
            {dict.labels.duration}
          </dt>
          <dd className="mt-1">{selectedDuration.label}</dd>
        </div>
        {breakdown.addOns.length > 0 ? (
          <div>
            <dt className="uppercase tracking-[0.16em] text-[var(--mocha)]">
              {dict.labels.addOns}
            </dt>
            <dd className="mt-1">
              {breakdown.addOns.map((item) => item.name).join(", ")}
            </dd>
          </div>
        ) : null}
      </dl>

      <HoverButton
        href={`${href(locale, "/checkout")}?${selectionToQuery(selection)}`}
        className="mt-8 w-full"
      >
        {dict.buttons.continueToPayment}
      </HoverButton>
      <HoverButton
        href={href(locale, "/booking-info")}
        variant="dark"
        className="mt-3 w-full"
      >
        {dict.buttons.bookingInfoPolicies}
      </HoverButton>
      <p className="mt-4 text-xs leading-relaxed text-[var(--charcoal-soft)]">
        {dict.pages.plan.depositNote}
      </p>

      <p className="mt-8 font-[family-name:var(--font-script)] text-2xl text-[var(--mocha)]">
        {dict.pages.plan.script}
      </p>
    </aside>
  );

  if (standalone) {
    return (
      <section className="bg-[var(--ivory)] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:grid-cols-[1.2fr_0.8fr] md:px-8">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--mocha)]">
              {dict.labels.home} / {dict.nav.plan}
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl md:text-4xl">
              {dict.pages.plan.formTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--charcoal-soft)]">
              {dict.pages.plan.formBody}
            </p>
            <div className="mt-10">{steps}</div>
          </div>
          {priceSidebar}
        </div>
      </section>
    );
  }

  return (
    <section id="plan" className="bg-[var(--ivory)] py-20 md:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-0 overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[420px] lg:min-h-full">
          <Image
            src="/images/hero/sunset.jpg"
            alt="Create your private sea day"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/20" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-[var(--ivory)] md:p-10">
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--sand)]">
              {dict.nav.plan}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05]">
              {dict.pages.plan.homeScriptLine1}
              <br />
              {dict.pages.plan.homeScriptLine2}
              <br />
              {dict.pages.plan.homeScriptLine3}
            </h2>
          </div>
        </div>
        <div className="bg-[var(--cream)] p-6 md:p-10">
          {steps}
          <div className="mt-10 lg:hidden">{priceSidebar}</div>
        </div>
      </div>
    </section>
  );
}
