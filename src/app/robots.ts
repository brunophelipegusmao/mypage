import { MetadataRoute } from "next";

import {
  buildAbsoluteUrl,
  shouldIndexSite,
  siteUrl,
} from "@/lib/site-metadata";

export default function robots(): MetadataRoute.Robots {
  if (!shouldIndexSite) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/_next/"],
    },
    sitemap: buildAbsoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
