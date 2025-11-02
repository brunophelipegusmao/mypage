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
  title: "BGM Tecnologia Web - Bruno Gusmão Mulim",
  description: "Desenvolvedor Full Stack especializado em soluções modernas e inovadoras. Criação de websites, aplicações web e consultoria técnica.",
  keywords: "desenvolvedor full stack, next.js, react, typescript, desenvolvimento web, bruno mulim, bgm tecnologia",
  authors: [{ name: "Bruno Gusmão Mulim" }],
  creator: "Bruno Gusmão Mulim",
  publisher: "BGM Tecnologia Web",
  openGraph: {
    title: "BGM Tecnologia Web - Bruno Gusmão Mulim",
    description: "Desenvolvedor Full Stack especializado em soluções modernas e inovadoras",
    url: "https://bgm-tecnologia.vercel.app",
    siteName: "BGM Tecnologia Web",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BGM Tecnologia Web - Bruno Gusmão Mulim",
    description: "Desenvolvedor Full Stack especializado em soluções modernas e inovadoras",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "google-site-verification-code", // Adicionar depois
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
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
