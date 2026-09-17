import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/dict";
import { href, type Locale } from "@/lib/i18n";
import { contact } from "@/lib/site-config";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const { experiences } = getContent(locale);

  const exploreLinks = [
    { label: dict.footer.allExperiences, path: "/experiences" },
    { label: dict.nav.boats, path: "/boats" },
    { label: dict.nav.destinations, path: "/destinations" },
    { label: dict.nav.journal, path: "/journal" },
  ];

  const planLinks = [
    { label: dict.nav.plan, path: "/plan" },
    { label: dict.nav.transfers, path: "/transfers" },
    { label: dict.nav.bookingInfo, path: "/booking-info" },
    { label: dict.nav.faq, path: "/faq" },
    { label: dict.nav.contact, path: "/contact" },
  ];

  const companyLinks = [
    { label: dict.nav.about, path: "/about" },
    { label: dict.nav.reviews, path: "/reviews" },
    { label: dict.nav.responsible, path: "/responsible" },
    { label: dict.nav.partners, path: "/partners" },
  ];

  return (
    <footer className="bg-[var(--charcoal)] text-[var(--ivory)]">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 md:px-8 md:py-20">
        <div>
          <Image
            src="/images/brand/logo.png"
            alt="Trang Voyage"
            width={200}
            height={200}
            className="h-24 w-24 object-contain brightness-0 invert"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--ivory)]/70">
            {dict.brand.footerTagline}
          </p>
          <p className="mt-5 font-[family-name:var(--font-script)] text-2xl text-[var(--sand)]">
            {dict.brand.script}
          </p>
          <LanguageSwitcher locale={locale} tone="light" className="mt-6 text-sm" />
        </div>

        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--sand)]">
            {dict.footer.experiences}
          </p>
          <ul className="mt-4 space-y-3 text-sm text-[var(--ivory)]/80">
            {experiences.map((experience) => (
              <li key={experience.slug}>
                <Link
                  href={href(locale, `/experiences/${experience.slug}`)}
                  className="transition hover:text-[var(--ivory)]"
                >
                  {experience.title}
                </Link>
              </li>
            ))}
            {exploreLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={href(locale, link.path)}
                  className="transition hover:text-[var(--ivory)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--sand)]">
            {dict.footer.planBook}
          </p>
          <ul className="mt-4 space-y-3 text-sm text-[var(--ivory)]/80">
            {planLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={href(locale, link.path)}
                  className="transition hover:text-[var(--ivory)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--sand)]">
            {dict.footer.company}
          </p>
          <ul className="mt-4 space-y-3 text-sm text-[var(--ivory)]/80">
            {companyLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={href(locale, link.path)}
                  className="transition hover:text-[var(--ivory)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--sand)]">
            {dict.footer.getInspired}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--ivory)]/70">
            {dict.footer.inspiredBody}
          </p>
          <form className="mt-5 flex flex-col gap-3" action={href(locale, "/contact")}>
            <input
              type="email"
              name="email"
              placeholder={dict.footer.emailPlaceholder}
              className="h-11 border border-white/15 bg-transparent px-3 text-sm text-[var(--ivory)] outline-none placeholder:text-[var(--ivory)]/40 focus:border-[var(--sand)]"
            />
            <button
              type="submit"
              className="h-11 bg-[var(--mocha)] px-4 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[var(--ivory)] transition hover:bg-[var(--mocha-deep)]"
            >
              {dict.footer.subscribe}
            </button>
          </form>

          <div className="mt-8 space-y-2 text-sm text-[var(--ivory)]/80">
            <a href={contact.whatsapp} className="block transition hover:text-[var(--ivory)]">
              WhatsApp {contact.phone}
            </a>
            <a href={contact.line} className="block transition hover:text-[var(--ivory)]">
              LINE @trangvoyage
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="block transition hover:text-[var(--ivory)]"
            >
              {contact.email}
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-xs uppercase tracking-[0.16em] text-[var(--sand)]">
            <a href={contact.instagram}>Instagram</a>
            <a href={contact.facebook}>Facebook</a>
            <a href={contact.tiktok}>TikTok</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-[var(--ivory)]/50 md:px-8">
        (c) {new Date().getFullYear()} {dict.brand.rights}
      </div>
    </footer>
  );
}
