import "./globals.css";

import clsx from "clsx";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bgm-tecnologia.vercel.app"),
  applicationName: "Corelayer",
  title: {
    default: "Corelayer - Análise de sistemas, entrega previsível",
    template: "%s | Corelayer",
  },
  description:
    "Sistemas sob medida para web e mobile. Do planejamento ao deploy, com foco em performance, DX e qualidade de produção.",
  keywords: [
    "corelayer",
    "clean architecture",
    "desenvolvimento web",
    "desenvolvimento mobile",
    "apis",
    "dashboards",
    "next.js",
    "react",
    "typescript",
  ],
  authors: [{ name: "Corelayer" }],
  creator: "Corelayer",
  publisher: "Corelayer",
  category: "technology",
  classification: "Business",
  openGraph: {
    title: "Corelayer - Análise de sistemas, entrega previsível",
    description:
      "Sistemas sob medida para web e mobile. Do planejamento ao deploy, com foco em performance, DX e qualidade de produção.",
    url: "https://bgm-tecnologia.vercel.app",
    siteName: "Corelayer",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Corelayer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corelayer - Análise de sistemas, entrega previsível",
    description:
      "Sistemas sob medida para web e mobile com foco em performance e qualidade.",
    creator: "@corelayer",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Adicionar depois do deploy
  },
  alternates: {
    canonical: "https://bgm-tecnologia.vercel.app",
  },
  manifest: "/pwa/manifest.webmanifest",
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
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#1B6AFF",
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
        "@type": "Organization",
        "@id": "https://bgm-tecnologia.vercel.app/#organization",
        name: "Corelayer",
        url: "https://bgm-tecnologia.vercel.app",
        logo: "https://bgm-tecnologia.vercel.app/logo.svg",
        description:
          "Sistemas sob medida para web e mobile. Do planejamento ao deploy, com foco em performance, DX e qualidade de produção.",
        service: [
          {
            "@type": "Service",
            name: "Desenvolvimento Web & Mobile",
            description:
              "Aplicações modernas e responsivas para web e dispositivos móveis",
          },
          {
            "@type": "Service",
            name: "APIs & Dashboards",
            description:
              "Desenvolvimento de APIs RESTful e dashboards interativos para gestão de dados",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://bgm-tecnologia.vercel.app/#website",
        url: "https://bgm-tecnologia.vercel.app",
        name: "Corelayer",
        description: "Análise de sistemas, entrega previsível",
        publisher: {
          "@id": "https://bgm-tecnologia.vercel.app/#organization",
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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
