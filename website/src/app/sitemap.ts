import type { MetadataRoute } from "next";
import { en } from "@/lib/content/en";
import { locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-config";

const staticPaths = [
  "/",
  "/experiences",
  "/boats",
  "/destinations",
  "/plan",
  "/journal",
  "/transfers",
  "/booking-info",
  "/about",
  "/responsible",
  "/partners",
  "/reviews",
  "/faq",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const dynamicPaths = [
    ...en.experiences.map((item) => `/experiences/${item.slug}`),
    ...en.boats.map((item) => `/boats/${item.id}`),
    ...en.destinations.map((item) => `/destinations/${item.slug}`),
    ...en.journalPosts.map((item) => `/journal/${item.slug}`),
  ];

  const paths = [...staticPaths, ...dynamicPaths];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency: (path === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [
            alt,
            `${siteUrl}/${alt}${path === "/" ? "" : path}`,
          ]),
        ),
      },
    })),
  );
}
