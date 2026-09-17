import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Outfit, Great_Vibes, Noto_Sans_Thai } from "next/font/google";
import { FloatingContact } from "@/components/floating-contact";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDict } from "@/lib/dict";
import { isLocale, locales, localeHtmlLang, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-config";
import "../globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const thai = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai"],
  weight: ["300", "400", "500", "600"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const active: Locale = isLocale(locale) ? locale : "en";
  const dict = getDict(active);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.home.title,
      template: `%s | ${dict.brand.name}`,
    },
    description: dict.meta.home.description,
    alternates: {
      canonical: `/${active}`,
      languages: {
        en: "/en",
        th: "/th",
      },
    },
    openGraph: {
      type: "website",
      siteName: dict.brand.name,
      locale: active === "th" ? "th_TH" : "en_US",
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      images: ["/images/hero/aerial.jpg"],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={localeHtmlLang[locale]}
      className={`${outfit.variable} ${thai.variable} ${display.variable} ${script.variable} h-full antialiased`}
    >
      <body
        className={`min-h-full bg-[var(--ivory)] text-[var(--charcoal)] ${
          locale === "th" ? "font-[family-name:var(--font-thai)]" : ""
        }`}
      >
        <SiteHeader locale={locale} />
        <main>{children}</main>
        <SiteFooter locale={locale} />
        <FloatingContact />
      </body>
    </html>
  );
}
