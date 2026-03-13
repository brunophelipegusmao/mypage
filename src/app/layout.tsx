import "./globals.css";

import clsx from "clsx";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/contexts/ThemeContext";
import {
  buildAbsoluteUrl,
  shouldIndexSite,
  siteDescription,
  siteKeywords,
  siteOrigin,
  siteOwnerName,
  siteTitle,
  siteUrl,
} from "@/lib/site-metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteOrigin,
  applicationName: siteOwnerName,
  title: {
    default: siteTitle,
    template: `%s | ${siteOwnerName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: siteOwnerName }],
  creator: siteOwnerName,
  publisher: siteOwnerName,
  category: "technology",
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteOwnerName,
    locale: "pt_BR",
    type: "website",
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
    images: ["/og-image.svg"],
  },
  robots: {
    index: shouldIndexSite,
    follow: shouldIndexSite,
    googleBot: {
      index: shouldIndexSite,
      follow: shouldIndexSite,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      {
        url: "/web/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        url: "/web/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/web/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
    ],
    apple: [
      {
        url: "/web/apple-touch-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/web/favicon.ico",
  },
  other: {
    "theme-color": "#1B6AFF",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: siteOwnerName,
        url: siteUrl,
        image: buildAbsoluteUrl("/og-image.svg"),
        jobTitle: "Engenharia de produto e sistemas",
        description: siteDescription,
        sameAs: [
          "https://github.com/brunophelipegusmao",
          "https://www.linkedin.com/in/bruno-mulim/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteTitle,
        description: siteDescription,
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
        inLanguage: "pt-BR",
      },
    ],
  };

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={clsx(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          "text-foreground bg-background",
        )}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
