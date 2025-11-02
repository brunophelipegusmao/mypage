import "./globals.css";

import clsx from "clsx";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/Header";

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
  title: {
    default: "BGM Tecnologia Web - Bruno Gusmão Mulim",
    template: "%s | BGM Tecnologia Web",
  },
  description:
    "Desenvolvedor Full Stack especializado em soluções modernas e inovadoras. Criação de websites, aplicações web e consultoria técnica com Next.js, React e TypeScript.",
  keywords: [
    "desenvolvedor full stack",
    "next.js",
    "react",
    "typescript",
    "desenvolvimento web",
    "bruno mulim",
    "bgm tecnologia",
    "consultoria técnica",
    "aplicações web",
    "sites responsivos",
    "e-commerce",
    "rio de janeiro",
  ],
  authors: [{ name: "Bruno Gusmão Mulim", url: "https://github.com/bmulim" }],
  creator: "Bruno Gusmão Mulim",
  publisher: "BGM Tecnologia Web",
  category: "technology",
  classification: "Business",
  openGraph: {
    title: "BGM Tecnologia Web - Bruno Gusmão Mulim",
    description:
      "Desenvolvedor Full Stack especializado em soluções modernas e inovadoras",
    url: "https://bgm-tecnologia.vercel.app",
    siteName: "BGM Tecnologia Web",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "BGM Tecnologia Web - Desenvolvedor Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BGM Tecnologia Web - Bruno Gusmão Mulim",
    description:
      "Desenvolvedor Full Stack especializado em soluções modernas e inovadoras",
    creator: "@brunopmulim",
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icon-192x192.png",
    shortcut: "/favicon.svg",
  },
  other: {
    "msapplication-TileColor": "#049DD9",
    "theme-color": "#049DD9",
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
        "@id": "https://bgm-tecnologia.vercel.app/#person",
        name: "Bruno Gusmão Mulim",
        url: "https://bgm-tecnologia.vercel.app",
        image: "https://bgm-tecnologia.vercel.app/bruno-profile.jpg",
        jobTitle: "Desenvolvedor Full Stack",
        worksFor: {
          "@type": "Organization",
          name: "BGM Tecnologia Web",
        },
        sameAs: [
          "https://github.com/bmulim",
          "https://www.linkedin.com/in/bruno-mulim/",
          "https://instagram.com/brunopmulim",
        ],
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Desenvolvimento Web",
          "Consultoria Técnica",
        ],
        address: {
          "@type": "PostalAddress",
          addressRegion: "RJ",
          addressCountry: "BR",
          addressLocality: "Rio de Janeiro",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://bgm-tecnologia.vercel.app/#organization",
        name: "BGM Tecnologia Web",
        url: "https://bgm-tecnologia.vercel.app",
        logo: "https://bgm-tecnologia.vercel.app/logo.svg",
        description: "Desenvolvimento web especializado em soluções modernas",
        founder: {
          "@id": "https://bgm-tecnologia.vercel.app/#person",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+55-21-99870-8634",
          email: "bruno.mulim.prog@gmail.com",
          contactType: "customer service",
          availableLanguage: "Portuguese",
        },
        service: [
          {
            "@type": "Service",
            name: "Desenvolvimento Web",
            description: "Criação de websites e aplicações web modernas",
          },
          {
            "@type": "Service",
            name: "Consultoria Técnica",
            description: "Assessoria em tecnologia e arquitetura de sistemas",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://bgm-tecnologia.vercel.app/#website",
        url: "https://bgm-tecnologia.vercel.app",
        name: "BGM Tecnologia Web",
        description: "Portfólio e serviços de desenvolvimento web",
        publisher: {
          "@id": "https://bgm-tecnologia.vercel.app/#organization",
        },
        inLanguage: "pt-BR",
      },
    ],
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={clsx(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          "text-foreground bg-black/80",
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
