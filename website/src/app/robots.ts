export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/en/checkout/", "/th/checkout/", "/en/checkout", "/th/checkout"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}