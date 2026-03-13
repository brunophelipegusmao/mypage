import { Metadata } from "next";

import HomeExperience from "@/components/HomeExperience";
import {
  buildAbsoluteUrl,
  siteDescription,
  siteKeywords,
  siteTitle,
} from "@/lib/site-metadata";

export const metadata: Metadata = {
  description: siteDescription,
  keywords: siteKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: buildAbsoluteUrl("/"),
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function HomePage() {
  return <HomeExperience />;
}
