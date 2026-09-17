"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, stripLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  className?: string;
  tone?: "light" | "dark";
};

export function LanguageSwitcher({ locale, className, tone = "dark" }: Props) {
  const pathname = usePathname();
  const rest = stripLocale(pathname ?? "/");

  const setCookie = (next: Locale) => {
    document.cookie = `locale=${next}; path=/; max-age=31536000`;
  };

  return (
    <div className={cn("flex items-center gap-1 text-[0.65rem]", className)}>
      {locales.map((item, index) => (
        <span key={item} className="flex items-center gap-1">
          {index > 0 ? (
            <span className={tone === "light" ? "text-[var(--ivory)]/40" : "text-[var(--sand-line)]"}>
              /
            </span>
          ) : null}
          <Link
            href={`/${item}${rest === "/" ? "" : rest}`}
            onClick={() => setCookie(item)}
            aria-current={item === locale ? "true" : undefined}
            className={cn(
              "uppercase tracking-[0.18em] transition",
              item === locale
                ? tone === "light"
                  ? "text-[var(--ivory)]"
                  : "text-[var(--mocha)]"
                : tone === "light"
                  ? "text-[var(--ivory)]/55 hover:text-[var(--ivory)]"
                  : "text-[var(--charcoal-soft)] hover:text-[var(--mocha)]",
            )}
          >
            {localeNames[item]}
          </Link>
        </span>
      ))}
    </div>
  );
}
