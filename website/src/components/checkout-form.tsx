"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, CreditCard, Landmark, QrCode } from "lucide-react";
import { MockQr } from "@/components/mock-qr";
import { HoverButton } from "@/components/ui/hover-button";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/dict";
import { href, type Locale } from "@/lib/i18n";
import { formatTHB, priceBreakdown, type Selection } from "@/lib/pricing";
import { contact, paymentConfig, pricingConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Method = "promptpay" | "transfer" | "card";
type Stage = "form" | "processing" | "success";

export function CheckoutForm({
  locale,
  selection,
}: {
  locale: Locale;
  selection: Selection;
}) {
  const dict = getDict(locale);
  const content = getContent(locale);
  const breakdown = useMemo(
    () => priceBreakdown(content, selection),
    [content, selection],
  );

  const experience = content.experiences.find(
    (item) => item.slug === selection.experienceSlug,
  )!;
  const boat = content.boats.find((item) => item.id === selection.boatId)!;

  const [stage, setStage] = useState<Stage>("form");
  const [amountType, setAmountType] = useState<"deposit" | "full">("deposit");
  const [method, setMethod] = useState<Method>("promptpay");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState(false);
  const [reference, setReference] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelDate: "",
    nationality: "foreign",
    hotel: "",
    notes: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const dueNow = amountType === "deposit" ? breakdown.deposit : breakdown.total;
  const remaining = breakdown.total - dueNow;

  const submit = () => {
    const requiredFilled =
      form.fullName.trim() && form.email.trim() && form.phone.trim() && form.travelDate;
    const cardFilled =
      method !== "card" ||
      (form.cardNumber.trim() && form.cardName.trim() && form.cardExpiry.trim() && form.cardCvc.trim());

    if (!requiredFilled || !cardFilled || !accepted) {
      setError(true);
      return;
    }

    setError(false);
    setStage("processing");
    const code = `TV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setTimeout(() => {
      setReference(code);
      setStage("success");
    }, 1600);
  };

  if (stage === "success") {
    return (
      <section className="bg-[var(--ivory)] py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--mocha)] text-[var(--ivory)]">
            <Check size={26} />
          </span>
          <p className="mt-6 text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mocha)]">
            {dict.checkout.success.eyebrow}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl">
            {dict.checkout.success.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--charcoal-soft)]">
            {dict.checkout.success.body}
          </p>

          <div className="mt-8 grid gap-4 border-y border-[var(--sand-line)] py-6 sm:grid-cols-2">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[var(--mocha)]">
                {dict.checkout.success.reference}
              </p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl">
                {reference}
              </p>
            </div>
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[var(--mocha)]">
                {dict.checkout.success.paid}
              </p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl">
                {dict.labels.thb} {formatTHB(dueNow)}
              </p>
            </div>
          </div>

          <div className="mt-8 text-left">
            <h2 className="font-[family-name:var(--font-display)] text-2xl">
              {dict.checkout.success.nextTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {dict.checkout.success.next.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-[var(--mocha)] pl-4 text-sm text-[var(--charcoal-soft)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <HoverButton href={href(locale, "/")}>
              {dict.checkout.success.backHome}
            </HoverButton>
            <HoverButton href={href(locale, "/booking-info")} variant="dark">
              {dict.checkout.success.viewBookingInfo}
            </HoverButton>
          </div>
        </div>
      </section>
    );
  }

  const methodOptions: { id: Method; label: string; note: string; icon: React.ReactNode }[] =
    [
      {
        id: "promptpay",
        label: dict.checkout.method.promptpay,
        note: dict.checkout.method.promptpayNote,
        icon: <QrCode size={18} />,
      },
      {
        id: "transfer",
        label: dict.checkout.method.transfer,
        note: dict.checkout.method.transferNote,
        icon: <Landmark size={18} />,
      },
      {
        id: "card",
        label: dict.checkout.method.card,
        note: dict.checkout.method.cardNote,
        icon: <CreditCard size={18} />,
      },
    ];

  const inputClass =
    "h-11 w-full border border-[var(--sand-line)] bg-[var(--ivory)] px-3 text-sm outline-none focus:border-[var(--mocha)]";
  const labelClass =
    "block text-[0.62rem] uppercase tracking-[0.18em] text-[var(--mocha)]";

  return (
    <section className="bg-[var(--ivory)] py-16 md:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 lg:grid-cols-[1.15fr_0.85fr] md:px-8">
        <div>
          {paymentConfig.isMock ? (
            <p className="border border-[var(--mocha)]/40 bg-[var(--cream)] px-4 py-3 text-xs leading-relaxed text-[var(--charcoal-soft)]">
              {dict.checkout.demoNotice}
            </p>
          ) : null}

          <div className="mt-10">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mocha)]">
              {dict.checkout.step1}
            </p>
            <div className="mt-4 flex flex-col gap-4 border border-[var(--sand-line)] bg-[var(--cream)] p-4 sm:flex-row sm:items-center">
              <div className="relative h-24 w-full shrink-0 overflow-hidden sm:h-20 sm:w-28">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-[family-name:var(--font-display)] text-xl">
                  {experience.title}
                </p>
                <p className="mt-1 text-xs text-[var(--charcoal-soft)]">
                  {boat.name} / {selection.guests} {dict.labels.guests} /{" "}
                  {selection.duration === "half" ? dict.labels.halfDay : dict.labels.fullDay}
                </p>
                {breakdown.addOns.length > 0 ? (
                  <p className="mt-1 text-xs text-[var(--charcoal-soft)]">
                    {dict.labels.addOns}:{" "}
                    {breakdown.addOns.map((item) => item.name).join(", ")}
                  </p>
                ) : null}
              </div>
              <Link
                href={href(locale, "/plan")}
                className="shrink-0 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--mocha)]"
              >
                {dict.checkout.editTrip}
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mocha)]">
              {dict.checkout.step2}
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="fullName">
                  {dict.checkout.fields.fullName}
                </label>
                <input
                  id="fullName"
                  className={cn(inputClass, "mt-2")}
                  value={form.fullName}
                  onChange={(event) => update("fullName", event.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="email">
                  {dict.checkout.fields.email}
                </label>
                <input
                  id="email"
                  type="email"
                  className={cn(inputClass, "mt-2")}
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="phone">
                  {dict.checkout.fields.phone}
                </label>
                <input
                  id="phone"
                  className={cn(inputClass, "mt-2")}
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="travelDate">
                  {dict.checkout.fields.travelDate}
                </label>
                <input
                  id="travelDate"
                  type="date"
                  className={cn(inputClass, "mt-2")}
                  value={form.travelDate}
                  onChange={(event) => update("travelDate", event.target.value)}
                />
              </div>
              <div>
                <span className={labelClass}>{dict.checkout.fields.nationality}</span>
                <div className="mt-2 flex gap-3">
                  {[
                    { id: "thai", label: dict.checkout.fields.nationalityThai },
                    { id: "foreign", label: dict.checkout.fields.nationalityForeign },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => update("nationality", option.id)}
                      className={cn(
                        "h-11 flex-1 border text-xs uppercase tracking-[0.14em] transition",
                        form.nationality === option.id
                          ? "border-[var(--mocha)] bg-[var(--mocha)] text-[var(--ivory)]"
                          : "border-[var(--sand-line)]",
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass} htmlFor="hotel">
                  {dict.checkout.fields.hotel}
                </label>
                <input
                  id="hotel"
                  className={cn(inputClass, "mt-2")}
                  value={form.hotel}
                  onChange={(event) => update("hotel", event.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="notes">
                  {dict.checkout.fields.notes}
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder={dict.checkout.fields.notesPlaceholder}
                  className="mt-2 w-full border border-[var(--sand-line)] bg-[var(--ivory)] p-3 text-sm outline-none focus:border-[var(--mocha)]"
                  value={form.notes}
                  onChange={(event) => update("notes", event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--mocha)]">
              {dict.checkout.step3}
            </p>

            <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl">
              {dict.checkout.amount.title}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                {
                  id: "deposit" as const,
                  label: dict.checkout.amount.deposit,
                  note: dict.checkout.amount.depositNote,
                  value: breakdown.deposit,
                },
                {
                  id: "full" as const,
                  label: dict.checkout.amount.full,
                  note: dict.checkout.amount.fullNote,
                  value: breakdown.total,
                },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setAmountType(option.id)}
                  className={cn(
                    "border p-4 text-left transition",
                    amountType === option.id
                      ? "border-[var(--mocha)] bg-[var(--cream)]"
                      : "border-[var(--sand-line)] hover:border-[var(--mocha)]/50",
                  )}
                >
                  <span className="block text-sm">{option.label}</span>
                  <span className="mt-1 block font-[family-name:var(--font-display)] text-2xl text-[var(--mocha)]">
                    {dict.labels.thb} {formatTHB(option.value)}
                  </span>
                  <span className="mt-1 block text-xs text-[var(--charcoal-soft)]">
                    {option.note}
                  </span>
                </button>
              ))}
            </div>

            <h3 className="mt-10 font-[family-name:var(--font-display)] text-2xl">
              {dict.checkout.method.title}
            </h3>
            <div className="mt-4 space-y-3">
              {methodOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setMethod(option.id)}
                  className={cn(
                    "flex w-full items-center gap-4 border p-4 text-left transition",
                    method === option.id
                      ? "border-[var(--mocha)] bg-[var(--cream)]"
                      : "border-[var(--sand-line)] hover:border-[var(--mocha)]/50",
                  )}
                >
                  <span className="text-[var(--mocha)]">{option.icon}</span>
                  <span className="flex-1">
                    <span className="block text-sm">{option.label}</span>
                    <span className="mt-0.5 block text-xs text-[var(--charcoal-soft)]">
                      {option.note}
                    </span>
                  </span>
                  {method === option.id ? (
                    <span className="text-[var(--mocha)]">
                      <Check size={18} />
                    </span>
                  ) : null}
                </button>
              ))}
            </div>

            <div className="mt-6 border border-[var(--sand-line)] bg-[var(--cream)] p-6">
              {method === "promptpay" ? (
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                  <MockQr value={`promptpay-${dueNow}`} />
                  <div className="text-sm">
                    <p className="font-[family-name:var(--font-display)] text-xl">
                      {dict.checkout.method.scanToPay}
                    </p>
                    <p className="mt-3 text-[var(--charcoal-soft)]">
                      {dict.checkout.method.promptpayId}: {paymentConfig.promptPayId}
                    </p>
                    <p className="mt-1 text-[var(--charcoal-soft)]">
                      {dict.labels.thb} {formatTHB(dueNow)}
                    </p>
                  </div>
                </div>
              ) : null}

              {method === "transfer" ? (
                <div className="space-y-3 text-sm">
                  <p>
                    <span className="text-[var(--mocha)]">
                      {dict.checkout.method.bank}:
                    </span>{" "}
                    {paymentConfig.bankName}
                  </p>
                  <p>
                    <span className="text-[var(--mocha)]">
                      {dict.checkout.method.accountName}:
                    </span>{" "}
                    {paymentConfig.bankAccountName}
                  </p>
                  <p>
                    <span className="text-[var(--mocha)]">
                      {dict.checkout.method.accountNumber}:
                    </span>{" "}
                    {paymentConfig.bankAccountNumber}
                  </p>
                  <div className="pt-2">
                    <label className={labelClass} htmlFor="slip">
                      {dict.checkout.method.uploadSlip}
                    </label>
                    <input
                      id="slip"
                      type="file"
                      accept="image/*"
                      className="mt-2 w-full border border-dashed border-[var(--sand-line)] bg-[var(--ivory)] p-3 text-xs"
                    />
                    <p className="mt-2 text-xs text-[var(--charcoal-soft)]">
                      {dict.checkout.method.uploadHint}{" "}
                      <a href={contact.line} className="text-[var(--mocha)]">
                        LINE @trangvoyage
                      </a>
                    </p>
                  </div>
                </div>
              ) : null}

              {method === "card" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="cardNumber">
                      {dict.checkout.method.cardNumber}
                    </label>
                    <input
                      id="cardNumber"
                      inputMode="numeric"
                      placeholder="4242 4242 4242 4242"
                      className={cn(inputClass, "mt-2")}
                      value={form.cardNumber}
                      onChange={(event) => update("cardNumber", event.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="cardName">
                      {dict.checkout.method.cardName}
                    </label>
                    <input
                      id="cardName"
                      className={cn(inputClass, "mt-2")}
                      value={form.cardName}
                      onChange={(event) => update("cardName", event.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="cardExpiry">
                      {dict.checkout.method.cardExpiry}
                    </label>
                    <input
                      id="cardExpiry"
                      placeholder="12/28"
                      className={cn(inputClass, "mt-2")}
                      value={form.cardExpiry}
                      onChange={(event) => update("cardExpiry", event.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="cardCvc">
                      {dict.checkout.method.cardCvc}
                    </label>
                    <input
                      id="cardCvc"
                      inputMode="numeric"
                      placeholder="123"
                      className={cn(inputClass, "mt-2")}
                      value={form.cardCvc}
                      onChange={(event) => update("cardCvc", event.target.value)}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <aside className="h-fit border border-[var(--sand-line)] bg-[var(--cream)] p-6 md:sticky md:top-28 md:p-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">
            {dict.checkout.summary.title}
          </h2>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--charcoal-soft)]">
                {dict.checkout.summary.packagePrice}
              </dt>
              <dd>
                {dict.labels.thb} {formatTHB(breakdown.base)}
              </dd>
            </div>
            {breakdown.extraGuests > 0 ? (
              <div className="flex justify-between gap-4">
                <dt className="text-[var(--charcoal-soft)]">
                  {dict.labels.guests} +{breakdown.extraGuests}
                </dt>
                <dd>
                  {dict.labels.thb} {formatTHB(breakdown.extraGuestTotal)}
                </dd>
              </div>
            ) : null}
            {breakdown.addOns.map((item) => (
              <div key={item.id} className="flex justify-between gap-4">
                <dt className="text-[var(--charcoal-soft)]">{item.name}</dt>
                <dd>
                  {dict.labels.thb} {formatTHB(item.amount)}
                </dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 border-t border-[var(--sand-line)] pt-3">
              <dt>{dict.checkout.summary.total}</dt>
              <dd className="font-medium">
                {dict.labels.thb} {formatTHB(breakdown.total)}
              </dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-[var(--sand-line)] pt-5">
            <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[var(--mocha)]">
              {dict.checkout.summary.dueNow}
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-4xl">
              {dict.labels.thb} {formatTHB(dueNow)}
            </p>
            {remaining > 0 ? (
              <p className="mt-2 text-xs text-[var(--charcoal-soft)]">
                {dict.checkout.summary.remaining}: {dict.labels.thb}{" "}
                {formatTHB(remaining)}
              </p>
            ) : null}
            <p className="mt-3 text-xs leading-relaxed text-[var(--charcoal-soft)]">
              {dict.checkout.summary.parkFeesNote}
            </p>
          </div>

          <label className="mt-6 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[var(--charcoal-soft)]">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              className="mt-0.5 accent-[var(--mocha)]"
            />
            <span>
              {dict.checkout.terms.label} -{" "}
              <Link href={href(locale, "/booking-info")} className="text-[var(--mocha)]">
                {dict.checkout.terms.link}
              </Link>
            </span>
          </label>

          {error ? (
            <p className="mt-4 border border-[var(--mocha)] px-3 py-2 text-xs text-[var(--mocha)]">
              {dict.checkout.validation}
            </p>
          ) : null}

          <button
            type="button"
            onClick={submit}
            disabled={stage === "processing"}
            className="mt-6 h-12 w-full bg-[var(--mocha)] text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[var(--ivory)] transition hover:bg-[var(--mocha-deep)] disabled:opacity-70"
          >
            {stage === "processing" ? dict.checkout.processing : dict.checkout.submit}
          </button>

          <p className="mt-4 text-xs leading-relaxed text-[var(--charcoal-soft)]">
            {dict.pages.plan.depositNote}
          </p>
          <p className="mt-2 text-xs text-[var(--charcoal-soft)]">
            {pricingConfig.baseGuests} {dict.labels.guests} /{" "}
            {pricingConfig.maxGuests} max
          </p>
        </aside>
      </div>
    </section>
  );
}
