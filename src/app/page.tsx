import { Metadata } from "next";

import HomeExperience from "@/components/HomeExperience";

export const metadata: Metadata = {
  title: "Corelayer - Análise de sistemas, entrega previsível",
  description:
    "Sistemas sob medida para web, mobile e backend. Projetos com Next.js, React, TypeScript, NestJS e foco em performance de produção.",
  keywords:
    "corelayer, clean architecture, desenvolvimento web, desenvolvimento mobile, nestjs, next.js, react, typescript, drizzle orm, framer motion",
  openGraph: {
    title: "Corelayer - Análise de sistemas, entrega previsível",
    description:
      "Sistemas sob medida para web, mobile e backend com foco em performance, DX e qualidade de produção.",
    url: "https://bgm-tecnologia.vercel.app",
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
      "Sistemas sob medida para web, mobile e backend com foco em performance e qualidade.",
  },
};

export default function HomePage() {
  return <HomeExperience />;
}
