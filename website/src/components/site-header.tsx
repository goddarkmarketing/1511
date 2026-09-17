"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { HoverButton } from "@/components/ui/hover-button";
import { getDict } from "@/lib/dict";
import { href, stripLocale, type Locale } from "@/lib/i18n";
import { contact } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const dict = getDict(locale);
  const current = stripLocale(pathname ?? "/");
  const isHome = current === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const solid = !isHome || scrolled || open;

  const navLinks = [
    { label: dict.nav.home, path: "/" },
    { label: dict.nav.experiences, path: "/experiences" },
    { label: dict.nav.boats, path: "/boats" },
    { label: dict.nav.plan, path: "/plan" },
    { label: dict.nav.journal, path: "/journal" },
  ];

  const moreLinks = [
    { label: dict.nav.destinations, path: "/destinations" },
    { label: dict.nav.transfers, path: "/transfers" },
    { label: dict.nav.bookingInfo, path: "/booking-info" },
    { label: dict.nav.about, path: "/about" },
    { label: dict.nav.responsible, path: "/responsible" },
    { label: dict.nav.partners, path: "/partners" },
    { label: dict.nav.reviews, path: "/reviews" },
    { label: dict.nav.faq, path: "/faq" },
    { label: dict.nav.contact, path: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "bg-[var(--ivory)]/95 text-[var(--charcoal)] shadow-[0_1px_0_rgba(40,32,24,0.08)] backdrop-blur-md"
          : "bg-transparent text-[var(--ivory)]",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center justify-between gap-4 px-5 md:px-8">
        <Link href={href(locale, "/")} className="relative z-20 flex items-center gap-3">
          <Image
            src="/images/brand/logo.png"
            alt="Trang Voyage"
            width={120}
            height={120}
            className={cn(
              "h-14 w-14 object-contain transition",
              solid ? "brightness-100" : "brightness-0 invert",
            )}
            priority
          />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={href(locale, link.path)}
              className={cn(
                "text-[0.68rem] font-medium uppercase tracking-[0.2em] opacity-90 transition hover:opacity-100",
                current === link.path ||
                  (link.path !== "/" && current.startsWith(link.path))
                  ? "opacity-100"
                  : "",
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-[0.68rem] font-medium uppercase tracking-[0.2em] opacity-90"
              onClick={() => setMoreOpen((v) => !v)}
            >
              {dict.nav.more} <ChevronDown size={14} />
            </button>
            {moreOpen ? (
              <div className="absolute left-1/2 top-full mt-3 w-60 -translate-x-1/2 border border-[var(--sand-line)] bg-[var(--ivory)] p-3 text-[var(--charcoal)] shadow-lg">
                {moreLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={href(locale, link.path)}
                    className="block px-3 py-2 text-sm transition hover:bg-[var(--cream)]"
                    onClick={() => setMoreOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="relative z-20 flex items-center gap-3">
          <LanguageSwitcher
            locale={locale}
            tone={solid ? "dark" : "light"}
            className="hidden md:flex"
          />
          <HoverButton
            href={href(locale, "/plan")}
            size="sm"
            className="hidden sm:inline-flex"
            variant={solid ? "solid" : "light"}
          >
            {dict.header.bookNow}
          </HoverButton>
          <button
            type="button"
            aria-label={open ? dict.header.closeMenu : dict.header.openMenu}
            className="inline-flex h-10 w-10 items-center justify-center xl:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 top-[4.5rem] overflow-y-auto bg-[var(--ivory)] transition-all duration-500 xl:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex min-h-full flex-col justify-between px-6 py-10 text-[var(--charcoal)]">
          <nav className="flex flex-col gap-4">
            {[...navLinks, ...moreLinks].map((link) => (
              <Link
                key={link.path}
                href={href(locale, link.path)}
                onClick={() => setOpen(false)}
                className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10 space-y-4">
            <LanguageSwitcher locale={locale} className="text-sm" />
            <HoverButton
              href={href(locale, "/plan")}
              className="w-full"
              onClick={() => setOpen(false)}
            >
              {dict.header.bookNow}
            </HoverButton>
            <div className="flex gap-4 text-sm text-[var(--mocha)]">
              <a href={contact.whatsapp}>WhatsApp</a>
              <a href={contact.line}>LINE</a>
              <a href={contact.phoneHref}>{dict.header.call}</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
