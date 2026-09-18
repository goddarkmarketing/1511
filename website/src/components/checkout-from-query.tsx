"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CheckoutForm } from "@/components/checkout-form";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { selectionFromParams } from "@/lib/pricing";

export function CheckoutFromQuery({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  const content = getContent(locale);

  const selection = useMemo(() => {
    const params: Record<string, string | undefined> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return selectionFromParams(content, params);
  }, [content, searchParams]);

  return <CheckoutForm locale={locale} selection={selection} />;
}
